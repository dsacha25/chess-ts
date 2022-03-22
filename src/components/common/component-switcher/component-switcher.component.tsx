import React, { Fragment } from 'react';
import { SwitcherContainer } from './component-switcher.styles';
import { SwitcherProps } from './types';

const ComponentSwitcher = ({ children, index }: SwitcherProps) => {
	return (
		<SwitcherContainer>
			{children && <Fragment>{children[index]}</Fragment>}
		</SwitcherContainer>
	);
};

export default ComponentSwitcher;
