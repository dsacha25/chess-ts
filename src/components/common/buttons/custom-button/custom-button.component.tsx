import React, { FC } from 'react';
import BaseButtonProps from '../base-button/types';
import { CustomButtonMain } from './custom-button.styles';

const CustomButton: FC<BaseButtonProps> = (props) => {
	return <CustomButtonMain {...props}>{props.children}</CustomButtonMain>;
};

export default CustomButton;
