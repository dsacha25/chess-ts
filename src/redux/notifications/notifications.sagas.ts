import { orderBy, where } from 'firebase/firestore';
import { differenceWith, isEqual } from 'lodash';
import { EventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	select,
	SelectEffect,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects';
import { db } from '../../utils/classes/firestore/firestore-app';
import { listener } from '../../utils/classes/sagas/saga-listener';
import getErrorMessage from '../../utils/helpers/errors/get-error-message';
import { Notification } from '../../utils/types/notification/notification';
import {
	fetchActiveGamesStart,
	fetchGameChallengesStart,
} from '../game/game.actions';
import { selectUserUID } from '../user/user.selector';
import {
	DeleteNotificationAction,
	ReadNotificationAction,
} from './notifications.action-types';
import {
	addReadNotification,
	addUnreadNotification,
	notificationError,
} from './notifications.actions';
import { selectAllNotifications } from './notifications.selector';
import { NotificationTypes } from './notifications.types';

export function* deleteNotificationAsync({
	payload: id,
}: DeleteNotificationAction) {
	try {
		yield db.delete('notifications', id);
	} catch (err) {
		yield put(notificationError(getErrorMessage(err)));
	}
}

export function* onDeleteNotification() {
	yield takeEvery(
		NotificationTypes.DELETE_NOTIFICATION,
		deleteNotificationAsync
	);
}

export function* markNotificationAsRead({
	payload: notification,
}: ReadNotificationAction) {
	try {
		yield db.update('notifications', notification.id, { unread: false });
	} catch (err) {
		yield put(notificationError(getErrorMessage(err)));
	}
}

export function* onReadNotification() {
	yield takeEvery(NotificationTypes.READ_NOTIFICATION, markNotificationAsRead);
}

export function* getNotifications(
	notifications: Notification[]
): Generator | SelectEffect {
	const allNotifications = yield select(selectAllNotifications);

	const difference = differenceWith(notifications, allNotifications, isEqual);

	console.log('DIFFERENCE: ', difference);

	if (difference.length === 0) {
		return;
	}

	let fetchedGames = false;
	for (const notification of notifications) {
		if (notification.unread) {
			yield put(addUnreadNotification(notification));

			if (notification.type === 'challenge') {
				yield put(fetchGameChallengesStart());
			}

			if (notification.type === 'challenge_accepted') {
				yield put(fetchActiveGamesStart());
			}

			if (notification.type === 'opponent_moved' && !fetchedGames) {
				yield put(fetchActiveGamesStart());
				fetchedGames = true;
			}
		} else {
			yield put(addReadNotification(notification));
		}
	}
}

export function* openNotificationListener(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const notificationsChannel: EventChannel<unknown> =
			yield listener.generateCollectionListener(
				'notifications',
				where('receiver', '==', uid),
				orderBy('createdAt')
			);

		yield listener.initializeChannel(notificationsChannel, getNotifications);
	} catch (err) {
		yield put(notificationError(getErrorMessage(err)));
	}
}

export function* onOpenNotificationListener() {
	yield takeLatest(
		NotificationTypes.OPEN_NOTIFICATION_LISTENER,
		openNotificationListener
	);
}

export function* notificationSagas() {
	yield all([
		call(onOpenNotificationListener),
		call(onReadNotification),
		call(onDeleteNotification),
	]);
}
