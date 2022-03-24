import React, { useState } from 'react';
import {
	NotificationButtonContainer,
	UnreadNotifFlag,
} from './notification-button.styles';

import { RiNotificationFill } from 'react-icons/ri';
import NotificationsWindow from '../notifications-window/notifications-window.component';

const NotificationButton = () => {
	const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);
	const [open, setOpen] = useState(false);

	return (
		<NotificationButtonContainer onClick={() => setOpen(!open)} color="main">
			<UnreadNotifFlag hasUnreadNotifs={hasUnreadNotifs} />
			<RiNotificationFill size="28px" />

			{open && <NotificationsWindow />}
		</NotificationButtonContainer>
	);
};

export default NotificationButton;
