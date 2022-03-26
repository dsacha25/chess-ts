import { where } from 'firebase/firestore';
import { EventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	select,
	SelectEffect,
	takeEvery,
} from 'redux-saga/effects';
import { listener } from '../../utils/classes/sagas/saga-listener';
import getErrorMessage from '../../utils/helpers/errors/get-error-message';
import { Notification } from '../../utils/types/notification/notification';
import { selectUserUID } from '../user/user.selector';
import {
	emitNewNotification,
	notificationError,
} from './notifications.actions';
import { NotificationTypes } from './notifications.types';

export function* getNotification(notifications: Notification[]) {
	yield console.log('NOTIFICATION: ', notifications);

	for (const notification of notifications) {
		yield put(emitNewNotification(notification));
	}
}

export function* openNotificationListener(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const notificationsChannel: EventChannel<unknown> =
			yield listener.generateCollectionListener(
				'notifications',
				where('reciever', '==', uid)
			);

		yield listener.initializeChannel(notificationsChannel, getNotification);
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

/* 

export function* emitNotification(notification: Notification) {
	yield console.log('NEW NOTIF: ', notification);
	yield put(emitNewNotification(notification));
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

		yield listener.initializeChannel(notificationsChannel, emitNewNotification);
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
