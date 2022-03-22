import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Avatar, HeaderContainer, LogOutButton } from './header.styles';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectProfilePicture } from '../../redux/user/user.selector';
import UsersOnly from '../../HOCs/with-user/with-user.hoc';
import useActions from '../../hooks/use-actions/use-actions.hook';

const Header = () => {
	const photoURL = useSelector((state) => selectProfilePicture(state));
	const { logOutStart } = useActions();

	useEffect(() => {
		console.log('PHOTO URL HEADER: ', photoURL);
	});

	return createPortal(
		<UsersOnly>
			<HeaderContainer>
				<LogOutButton onClick={() => logOutStart()} color="light">
					Log Out
				</LogOutButton>
				<Avatar url={photoURL} />
			</HeaderContainer>
		</UsersOnly>,
		document.getElementById('portal') as HTMLElement
	);
};

export default Header;
