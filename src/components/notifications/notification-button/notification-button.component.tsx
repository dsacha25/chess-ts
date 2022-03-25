import React, { useState } from 'react';
import {
	NotifButtonFlag,
	NotificationButtonContainer,
} from './notification-button.styles';

import { RiNotificationFill } from 'react-icons/ri';
import NotificationsWindow from '../notifications-window/notifications-window.component';
import { NotificationFlag } from '../notification-flag/notification-flag.styles';
import { ClickAwayListener } from '@material-ui/core';

const NotificationButton = () => {
	const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);
	const [open, setOpen] = useState(false);

	return (
		<ClickAwayListener onClickAway={() => setOpen(false)}>
			<NotificationButtonContainer onClick={() => setOpen(!open)} color="main">
				<NotifButtonFlag unread={hasUnreadNotifs} />
				<RiNotificationFill size="28px" />

				{open && <NotificationsWindow />}
			</NotificationButtonContainer>
		</ClickAwayListener>
	);
};

export default NotificationButton;
