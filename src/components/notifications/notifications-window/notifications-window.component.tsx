import React from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectAllNotifications } from '../../../redux/notifications/notifications.selector';
import NotificationItem from '../notification-item/notification-item.component';
import { NotificationsContainer } from './notifications-window.styles';

const NotificationsWindow = () => {
	const notifications = useSelector((state) => selectAllNotifications(state));

	return (
		<NotificationsContainer role="presentation">
			{notifications.map((notification, i) => (
				<NotificationItem key={i} notification={notification} />
			))}
		</NotificationsContainer>
	);
};

export default NotificationsWindow;
