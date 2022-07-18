import { orderBy, where } from 'firebase/firestore';
import { differenceWith, filter, isEqual } from 'lodash';
import { EventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	select,
	takeEvery,
	takeLatest,
} from 'typed-redux-saga/macro';
import { db } from '../../utils/classes/firestore/firestore-app';
import { listener } from '../../utils/classes/sagas/saga-listener';
import { Notification } from '../../utils/types/notifications/notification-type/notification-type';
import { fetchEnemiesStart } from '../enemies/enemies.actions';
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
	addReadNotifications,
	addUnreadNotifications,
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
		yield* put(notificationError((err as Error).message));
	}
}

export function* onDeleteNotification() {
	yield* takeEvery(
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
		yield* put(notificationError((err as Error).message));
	}
}

export function* onReadNotification() {
	yield* takeEvery(NotificationTypes.READ_NOTIFICATION, markNotificationAsRead);
}

export function* getNotifications(notifications: Notification[]) {
	const allNotifications = yield* select(selectAllNotifications);
	// console.log('NOTIFICATION PAYLOAD: ', notifications);

	const difference = differenceWith(notifications, allNotifications, isEqual);

	// console.log('DIFFERENCE: ', difference);

	yield* put(addUnreadNotifications(filter(notifications, ['unread', true])));
	yield* put(addReadNotifications(filter(notifications, ['unread', false])));

	if (difference.length === 0) {
		return;
	}

	let notificationFetches = {
		enemyRequest: false,
		enemyRequestAccepted: false,
		challenge: false,
		challengeAccepted: false,
		opponentMoved: false,
		gameOver: false,
		opponentResigned: false,
		drawRequested: false,
		drawAccepted: false,
		drawRejected: false,
	};

	for (const notification of notifications) {
		if (notification.unread) {
			if (notification.type === 'challenge' && !notificationFetches.challenge) {
				yield* put(fetchGameChallengesStart());
				notificationFetches.challenge = true;
			}

			if (
				notification.type === 'challenge_accepted' &&
				!notificationFetches.challengeAccepted
			) {
				yield* put(fetchActiveGamesStart());
				notificationFetches.challengeAccepted = true;
			}

			if (
				notification.type === 'opponent_moved' &&
				!notificationFetches.opponentMoved
			) {
				yield* put(fetchActiveGamesStart());
				notificationFetches.opponentMoved = true;
			}

			if (
				notification.type === 'request_accepted' &&
				!notificationFetches.enemyRequestAccepted
			) {
				yield* put(fetchEnemiesStart());

				notificationFetches.enemyRequestAccepted = true;
			}
		}
	}
}

export function* openNotificationListener() {
	try {
		const uid = yield* select(selectUserUID);
		if (!uid) return;

		const notificationsChannel: EventChannel<unknown> =
			yield listener.generateCollectionListener(
				'notifications',
				where('receiver', '==', uid),
				orderBy('createdAt')
			);

		yield listener.initializeChannel(notificationsChannel, getNotifications);
	} catch (err) {
		yield* put(notificationError((err as Error).message));
	}
}

export function* onOpenNotificationListener() {
	yield* takeLatest(
		NotificationTypes.OPEN_NOTIFICATION_LISTENER,
		openNotificationListener
	);
}

export function* notificationSagas() {
	yield* all([
		call(onOpenNotificationListener),
		call(onReadNotification),
		call(onDeleteNotification),
	]);
}
