import { Notification } from '../../utils/types/notifications/notification-type/notification-type';
import {
	DeleteNotificationAction,
	AddUnreadNotificationAction,
	AddUnreadNotificationsAction,
	NotificationErrorAction,
	OpenNotificationListenerAction,
	ReadNotificationAction,
	AddReadNotificationAction,
	AddReadNotificationsAction,
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

export const addUnreadNotifications = (
	notifications: Notification[]
): AddUnreadNotificationsAction => ({
	type: NotificationTypes.ADD_UNREAD_NOTIFICATIONS,
	payload: notifications,
});

export const addReadNotification = (
	notification: Notification
): AddReadNotificationAction => ({
	type: NotificationTypes.ADD_READ_NOTIFICATION,
	payload: notification,
});

export const addReadNotifications = (
	notifications: Notification[]
): AddReadNotificationsAction => ({
	type: NotificationTypes.ADD_READ_NOTIFICATIONS,
	payload: notifications,
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
