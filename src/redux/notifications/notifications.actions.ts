import { Notification } from '../../utils/types/notification/notification';
import {
	DeleteNotificationAction,
	AddUnreadNotificationAction,
	NotificationErrorAction,
	OpenNotificationListenerAction,
	ReadNotificationAction,
	AddReadNotificationAction,
} from './notifications.action-types';
import { NotificationTypes } from './notifications.types';

export const openNotificationListener = (): OpenNotificationListenerAction => ({
	type: NotificationTypes.OPEN_NOTIFICATION_LISTENER,
});

export const addUnreadNotification = (
	notification: Notification
): AddUnreadNotificationAction => ({
	type: NotificationTypes.ADD_UNREAD_NOTIFICATION,
	payload: notification,
});

export const addReadNotification = (
	notification: Notification
): AddReadNotificationAction => ({
	type: NotificationTypes.ADD_READ_NOTIFICATION,
	payload: notification,
});

export const readNotification = (
	notification: Notification
): ReadNotificationAction => ({
	type: NotificationTypes.READ_NOTIFICATION,
	payload: notification,
});

export const deleteNotification = (id: string): DeleteNotificationAction => ({
	type: NotificationTypes.DELETE_NOTIFICATION,
	payload: id,
});

export const notificationError = (error: string): NotificationErrorAction => ({
	type: NotificationTypes.NOTIFICATION_ERROR,
	payload: error,
});
