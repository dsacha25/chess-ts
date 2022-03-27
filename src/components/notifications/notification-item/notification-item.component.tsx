import React, { FC, useState } from 'react';
import { NotificationFlag } from '../notification-flag/notification-flag.styles';
import {
	DeleteNotifButton,
	NotificationElement,
	NotificationMessage,
} from './notification-item.styles';
import { NotificationItemProps } from './types';
import { GrClose } from 'react-icons/gr';
import useActions from '../../../hooks/use-actions/use-actions.hook';

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
	const { readNotification, deleteNotification } = useActions();
	const [timeout, setTO] = useState<NodeJS.Timeout | null>(null);

	const handleMarkAsRead = () => {
		if (notification.unread && !timeout) {
			console.log('MOUSE OUT');
			readNotification(notification);
		}
		if (timeout) {
			clearTimeout(timeout);
			setTO(null);
		}
	};

	const handleStartTimeout = () => {
		const to = setTimeout(() => {
			clearTimeout(to);
			setTO(null);
		}, 1000);

		setTO(to);
	};

	const handleDeleteNotification = () => {
		console.log('DELETE');

		deleteNotification(notification.id);
	};

	return (
		<NotificationElement
			onMouseEnter={handleStartTimeout}
			onMouseLeave={handleMarkAsRead}
		>
			<NotificationFlag unread={notification.unread} />
			<NotificationMessage>{notification.type}</NotificationMessage>
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
