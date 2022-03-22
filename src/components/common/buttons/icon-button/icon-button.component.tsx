import React, { FC } from 'react';
import { IconContext } from 'react-icons';
import BaseButtonProps from '../base-button/types';

import { IconButtonMain } from './icon-button.styles';

const IconButton: FC<BaseButtonProps> = (props) => {
	return (
		<IconContext.Provider value={{ className: 'react-icons', ...props }}>
			<IconButtonMain {...props}>{props.children}</IconButtonMain>
		</IconContext.Provider>
	);
};

export default IconButton;
