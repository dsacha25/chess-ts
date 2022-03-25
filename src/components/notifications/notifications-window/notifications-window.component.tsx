import React from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectUnreadNotifications } from '../../../redux/notifications/notifications.selector';
import NotificationItem from '../notification-item/notification-item.component';
import { NotificationsContainer } from './notifications-window.styles';

const NotificationsWindow = () => {
	const unreadNotifs = useSelector((state) => selectUnreadNotifications(state));

	return (
		<NotificationsContainer>
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
			{unreadNotifs.map((notification) => (
				<NotificationItem notification={notification} />
			))}
		</NotificationsContainer>
	);
};

export default NotificationsWindow;
