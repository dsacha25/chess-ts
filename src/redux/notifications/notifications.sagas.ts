import { orderBy, where } from 'firebase/firestore';
import { EventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	select,
	SelectEffect,
	takeEvery,
} from 'redux-saga/effects';
import { db } from '../../utils/classes/firestore/firestore-app';
import { listener } from '../../utils/classes/sagas/saga-listener';
import getErrorMessage from '../../utils/helpers/errors/get-error-message';
import { Notification } from '../../utils/types/notification/notification';
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
import { NotificationTypes } from './notifications.types';

export function* deleteNotificationAsync({
	payload: id,
}: DeleteNotificationAction) {
	try {
		yield console.log('DELETE NOTIFICATION', id);

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
		yield console.log('READ NOTIFICATION: ', notification);
		yield db.update('notifications', notification.id, { unread: false });
	} catch (err) {
		yield put(notificationError(getErrorMessage(err)));
	}
}

export function* onReadNotification() {
	yield takeEvery(NotificationTypes.READ_NOTIFICATION, markNotificationAsRead);
}

export function* getNotifications(notifications: Notification[]) {
	yield console.log('ALL NOTIFICATIONS: ', notifications);

	for (const notification of notifications) {
		if (notification.unread) {
			yield put(addUnreadNotification(notification));
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
				where('reciever', '==', uid),
				orderBy('createdAt')
			);

		yield listener.initializeChannel(notificationsChannel, getNotifications);
	} catch (err) {
		yield put(notificationError(getErrorMessage(err)));
	}
}

export function* onOpenNotificationListener() {
	yield takeEvery(
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

/* 

export function* emitNotification(notification: Notification) {
	yield console.log('NEW NOTIF: ', notification);
	yield put(addUnreadNotification(notification));
}

export function* openNotificationListener(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const notificationsChannel: EventChannel<unknown> =
			yield listener.generateCollectionListener(
				'notifications',
				where('reciever', '==', uid)
			);

		yield console.log('OPEN LISTENER');

		yield listener.initializeChannel(notificationsChannel, addUnreadNotification);
	} catch (err) {
		yield put(notificationError(getErrorMessage(err)));
	}
}

export function* onOpenNotificationListener() {
	yield takeEvery(
		NotificationTypes.OPEN_NOTIFICATION_LISTENER,
		openNotificationListener
	);
}

export function* notificationSagas() {
	yield all([call(onOpenNotificationListener)]);
}

*/
