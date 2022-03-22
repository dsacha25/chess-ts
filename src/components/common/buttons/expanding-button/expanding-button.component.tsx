import React, { FC, useState } from 'react';
import {
	ExpandingButtonContainer,
	ExpandableButton,
} from './expanding-button.styles';
import { ExpandingButtonProps } from './types';

const ExpandingButton: FC<ExpandingButtonProps> = (props) => {
	const [hover, setHover] = useState(false);
	return (
		<ExpandingButtonContainer
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			hover={hover}
		>
			{hover ? (
				<ExpandableButton color="light" hover={hover}>{props.children}</ExpandableButton>
			) : (
				<ExpandableButton {...props} color="light" hover={hover}>
					{props.icon}
				</ExpandableButton>
			)}
		</ExpandingButtonContainer>
	);
};

export default ExpandingButton;
