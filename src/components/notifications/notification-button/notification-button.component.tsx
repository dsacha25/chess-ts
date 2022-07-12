import React, { FC, useState } from 'react';
import {
	NotifButton,
	NotificationButtonContainer,
} from './notification-button.styles';

import { RiNotificationFill } from 'react-icons/ri';
import NotificationsWindow from '../notifications-window/notifications-window.component';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectUnreadNotifications } from '../../../redux/notifications/notifications.selector';
import { ClickAwayListener } from '@mui/material';
import { NotifButtonFlag } from '../notification-flag/notification-flag.styles';
import { NotificationButtonProps } from './types';

const NotificationButton: FC<NotificationButtonProps> = ({ mobile }) => {
	const unreadNotifs = useSelector((state) => selectUnreadNotifications(state));
	const [open, setOpen] = useState(false);

	return (
		<ClickAwayListener onClickAway={() => setOpen(false)}>
			<NotificationButtonContainer mobile={mobile}>
				<NotifButton
					mobile={mobile}
					onClick={() => setOpen(!open)}
					color={mobile ? 'light' : 'main'}
				>
					<NotifButtonFlag unread={unreadNotifs.length > 0} />
					<RiNotificationFill size={mobile ? '36px' : '30px'} />
				</NotifButton>

				{open ? <NotificationsWindow /> : null}
			</NotificationButtonContainer>
		</ClickAwayListener>
	);
};

export default NotificationButton;
