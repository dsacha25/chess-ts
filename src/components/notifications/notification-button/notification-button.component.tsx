import React, { useState } from 'react';
import {
	NotifButtonFlag,
	NotificationButtonContainer,
} from './notification-button.styles';

import { RiNotificationFill } from 'react-icons/ri';
import NotificationsWindow from '../notifications-window/notifications-window.component';
import { ClickAwayListener } from '@material-ui/core';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectUnreadNotifications } from '../../../redux/notifications/notifications.selector';

const NotificationButton = () => {
	const unreadNotifs = useSelector((state) => selectUnreadNotifications(state));
	const [open, setOpen] = useState(false);

	return (
		<ClickAwayListener onClickAway={() => setOpen(false)}>
			<NotificationButtonContainer onClick={() => setOpen(!open)} color="main">
				<NotifButtonFlag unread={unreadNotifs.length > 0} />
				<RiNotificationFill size="28px" />

				{open && <NotificationsWindow />}
			</NotificationButtonContainer>
		</ClickAwayListener>
	);
};

export default NotificationButton;
