import React from 'react';
import { createPortal } from 'react-dom';
import {
	Avatar,
	LogOutContainer,
	LogOutButton,
	HeaderContainer,
} from './header.styles';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectProfilePicture } from '../../redux/user/user.selector';
import UsersOnly from '../../HOCs/with-user/with-user.hoc';
import useActions from '../../hooks/use-actions/use-actions.hook';
import NotificationButton from '../notifications/notification-button/notification-button.component';
import useWindowSize from '../../hooks/use-window-size/use-window-size.hook';

const Header = () => {
	const photoURL = useSelector((state) => selectProfilePicture(state));
	const { logOutStart } = useActions();
	const { width } = useWindowSize();

	if (width <= 980) return null;

	return createPortal(
		<UsersOnly>
			<HeaderContainer>
				<NotificationButton />
				<LogOutContainer>
					<LogOutButton onClick={() => logOutStart()} color="secondary">
						Log Out
					</LogOutButton>
					<Avatar url={photoURL} />
				</LogOutContainer>
			</HeaderContainer>
		</UsersOnly>,
		document.getElementById('portal') as HTMLElement
	);
};

export default Header;
