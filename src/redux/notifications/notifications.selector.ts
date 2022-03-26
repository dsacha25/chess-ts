import { orderBy } from 'lodash';
import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectNotifications = (state: RootState) => state.notifications;

export const selectUnreadNotifications = createSelector(
	selectNotifications,
	(notifications) => notifications.unreadNotifications
);

export const selectReadNotifications = createSelector(
	selectNotifications,
	(notifications) => notifications.readNotifications
);

export const selectAllNotifications = createSelector(
	[selectUnreadNotifications, selectReadNotifications],
	(unread, read) => orderBy([...unread, ...read], 'unread', 'desc')
);
