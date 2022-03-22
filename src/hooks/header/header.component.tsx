import React from 'react';
import { createPortal } from 'react-dom';
import { Avatar, HeaderContainer } from './header.styles';
import DefaultPhoto from '../../assets/default-photo/DefaultPhoto.png';

const Header = () => {
	return createPortal(
		<HeaderContainer>
			<Avatar url={DefaultPhoto} />
		</HeaderContainer>,
		document.getElementById('portal') as HTMLElement
	);
};

export default Header;
