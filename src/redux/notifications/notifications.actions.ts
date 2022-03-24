import { OpenNotificationListenerAction } from './notifications.action-types';
import { NotificationTypes } from './notifications.types';

export const openNotificationListener = (): OpenNotificationListenerAction => ({
	type: NotificationTypes.OPEN_NOTIFICATION_LISTENER,
});
