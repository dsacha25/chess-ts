import { Notification } from '../../utils/types/notification/notification';
import NotificationActionTypes from './notifications.action-types';
import { NotificationTypes } from './notifications.types';
import { produce } from 'immer';

export interface NotificationsState {
	unreadNotifications: Notification[];
	readNotifications: Notification[];
}

const INITIAL_STATE: NotificationsState = {
	unreadNotifications: [],
	readNotifications: [],
};

const notificationsReducer = produce(
	(
		state: NotificationsState = INITIAL_STATE,
		action: NotificationActionTypes
	) => {
		switch (action.type) {
			case NotificationTypes.NEW_NOTIFICATION:
				state.unreadNotifications.push(action.payload);
				return state;
			case NotificationTypes.READ_NOTIFICATION:
				state.unreadNotifications.filter(
					(notification) => notification.id !== action.payload
				);
				return state;
			case NotificationTypes.DELETE_NOTIFICATION:
				state.unreadNotifications.filter(
					(notification) => notification.id !== action.payload
				);
				state.readNotifications.filter(
					(notification) => notification.id !== action.payload
				);
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default notificationsReducer;
