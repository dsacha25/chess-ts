import React from 'react';
import { createPortal } from 'react-dom';
import { Avatar, HeaderContainer } from './header.styles';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectProfilePicture } from '../../redux/user/user.selector';
import UsersOnly from '../../HOCs/with-user/with-user.hoc';

const Header = () => {
	const photoURL = useSelector((state) => selectProfilePicture(state));

	return createPortal(
		<UsersOnly>
			<HeaderContainer>
				<Avatar url={photoURL} />
			</HeaderContainer>
		</UsersOnly>,
		document.getElementById('portal') as HTMLElement
	);
};

export default Header;
