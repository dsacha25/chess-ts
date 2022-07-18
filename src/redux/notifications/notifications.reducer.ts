import { Notification } from '../../utils/types/notifications/notification-type/notification-type';
import NotificationActionTypes from './notifications.action-types';
import { NotificationTypes } from './notifications.types';
import { produce } from 'immer';
import { concat, filter, isEqual, orderBy, uniqWith } from 'lodash';

export interface NotificationsState {
	unreadNotifications: Notification[];
	readNotifications: Notification[];
	error: string;
}

const INITIAL_STATE: NotificationsState = {
	unreadNotifications: [],
	readNotifications: [],
	error: '',
};

const notificationsReducer = produce(
	(
		state: NotificationsState = INITIAL_STATE,
		action: NotificationActionTypes
	) => {
		switch (action.type) {
			case NotificationTypes.ADD_UNREAD_NOTIFICATIONS:
				state.unreadNotifications = action.payload;
				return state;
			case NotificationTypes.ADD_UNREAD_NOTIFICATION:
				state.unreadNotifications = uniqWith(
					concat(state.unreadNotifications, action.payload),
					isEqual
				);
				state.error = '';
				return state;

			case NotificationTypes.ADD_READ_NOTIFICATIONS:
				state.readNotifications = action.payload;
				return state;
			case NotificationTypes.ADD_READ_NOTIFICATION:
				state.readNotifications = uniqWith(
					concat(state.readNotifications, action.payload),
					isEqual
				);
				return state;
			case NotificationTypes.READ_NOTIFICATION:
				state.unreadNotifications = filter(
					state.unreadNotifications,
					(notif) => notif.id !== action.payload.id
				);
				state.readNotifications = orderBy(
					concat(state.readNotifications, { ...action.payload, unread: false }),
					'createdAt'
				);
				state.error = '';
				return state;
			case NotificationTypes.DELETE_NOTIFICATION:
				state.unreadNotifications = filter(
					state.unreadNotifications,
					(notification) => notification.id !== action.payload
				);
				state.readNotifications = filter(
					state.readNotifications,
					(notification) => notification.id !== action.payload
				);
				state.error = '';
				return state;
			case NotificationTypes.NOTIFICATION_ERROR:
				state.error = action.payload;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default notificationsReducer;
