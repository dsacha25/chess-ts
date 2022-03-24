import React, { FC } from 'react';
import {
	DeleteNotifButton,
	NotificationElement,
} from './notification-item.styles';
import { NotificationItemProps } from './types';

const NotificationItem: FC<NotificationItemProps> = (props) => {
	return (
		<NotificationElement>
			<p>-</p>
			<p>Notification Message</p>
			<DeleteNotifButton color="warn" borderless inverted>
				X
			</DeleteNotifButton>
		</NotificationElement>
	);
};

export default NotificationItem;
