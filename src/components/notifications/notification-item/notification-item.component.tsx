import React, { FC } from 'react';
import { NotificationFlag } from '../notification-flag/notification-flag.styles';
import {
	DeleteNotifButton,
	NotificationElement,
} from './notification-item.styles';
import { NotificationItemProps } from './types';
import { GrClose } from 'react-icons/gr';
import useActions from '../../../hooks/use-actions/use-actions.hook';

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
	const { readNotification, deleteNotification } = useActions();
	const handleMarkAsRead = () => {
		if (notification) {
			readNotification(notification.id);
		}
	};

	const handleDeleteNotification = () => {
		if (notification) {
			deleteNotification(notification.id);
		}
	};

	return (
		<NotificationElement onMouseOut={handleMarkAsRead}>
			<NotificationFlag unread={true} />
			<p>Notification Message</p>
			<DeleteNotifButton
				onClick={handleDeleteNotification}
				color="warn"
				borderless
				inverted
			>
				<GrClose size="15px" />
			</DeleteNotifButton>
		</NotificationElement>
	);
};

export default NotificationItem;
