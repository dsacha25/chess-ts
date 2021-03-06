import { Notification } from '../../utils/types/notifications/notification-type/notification-type';
import { NotificationTypes } from './notifications.types';

export interface OpenNotificationListenerAction {
	type: NotificationTypes.OPEN_NOTIFICATION_LISTENER;
}

export interface AddUnreadNotificationAction {
	type: NotificationTypes.ADD_UNREAD_NOTIFICATION;
	payload: Notification;
}

export interface AddReadNotificationAction {
	type: NotificationTypes.ADD_READ_NOTIFICATION;
	payload: Notification;
}
export interface AddUnreadNotificationsAction {
	type: NotificationTypes.ADD_UNREAD_NOTIFICATIONS;
	payload: Notification[];
}

export interface AddReadNotificationsAction {
	type: NotificationTypes.ADD_READ_NOTIFICATIONS;
	payload: Notification[];
}

export interface DeleteNotificationAction {
	type: NotificationTypes.DELETE_NOTIFICATION;
	payload: string;
}

export interface ReadNotificationAction {
	type: NotificationTypes.READ_NOTIFICATION;
	payload: Notification;
}

export interface NotificationErrorAction {
	type: NotificationTypes.NOTIFICATION_ERROR;
	payload: string;
}

type NotificationActionTypes =
	| OpenNotificationListenerAction
	| AddUnreadNotificationAction
	| AddUnreadNotificationsAction
	| AddReadNotificationAction
	| AddReadNotificationsAction
	| DeleteNotificationAction
	| ReadNotificationAction
	| NotificationErrorAction;

export default NotificationActionTypes;
