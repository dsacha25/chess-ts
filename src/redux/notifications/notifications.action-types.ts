import { Notification } from '../../utils/types/notification/notification';
import { NotificationTypes } from './notifications.types';

export interface OpenNotificationListenerAction {
	type: NotificationTypes.OPEN_NOTIFICATION_LISTENER;
}

export interface EmitNewNotificationAction {
	type: NotificationTypes.EMIT_NEW_NOTIFICATION;
	payload: Notification;
}

export interface DeleteNotificationAction {
	type: NotificationTypes.DELETE_NOTIFICATION;
	payload: string;
}

export interface ReadNotificationAction {
	type: NotificationTypes.READ_NOTIFICATION;
	payload: string;
}

type NotificationActionTypes =
	| OpenNotificationListenerAction
	| EmitNewNotificationAction
	| DeleteNotificationAction
	| ReadNotificationAction;

export default NotificationActionTypes;
