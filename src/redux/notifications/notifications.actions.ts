import { Notification } from '../../utils/types/notification/notification';
import {
	DeleteNotificationAction,
	EmitNewNotificationAction,
	NotificationErrorAction,
	OpenNotificationListenerAction,
	ReadNotificationAction,
} from './notifications.action-types';
import { NotificationTypes } from './notifications.types';

export const openNotificationListener = (): OpenNotificationListenerAction => ({
	type: NotificationTypes.OPEN_NOTIFICATION_LISTENER,
});

export const emitNewNotification = (
	notification: Notification
): EmitNewNotificationAction => ({
	type: NotificationTypes.EMIT_NEW_NOTIFICATION,
	payload: notification,
});

export const readNotification = (id: string): ReadNotificationAction => ({
	type: NotificationTypes.READ_NOTIFICATION,
	payload: id,
});

export const deleteNotification = (id: string): DeleteNotificationAction => ({
	type: NotificationTypes.DELETE_NOTIFICATION,
	payload: id,
});

export const notificationError = (error: string): NotificationErrorAction => ({
	type: NotificationTypes.NOTIFICATION_ERROR,
	payload: error,
});
