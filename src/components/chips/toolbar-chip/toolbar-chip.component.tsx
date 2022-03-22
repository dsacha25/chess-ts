import React from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectProfilePicture } from '../../../redux/user/user.selector';
import {
	ChipAvatar,
	ChipInfoContianer,
	ToolbarChipContainer,
} from './toolbar-chip.styles';

const ToolbarChip = () => {
	const photoURL = useSelector((state) => selectProfilePicture(state));
	return (
		<ToolbarChipContainer>
			<ChipAvatar url={photoURL} />
			<ChipInfoContianer>1200</ChipInfoContianer>
		</ToolbarChipContainer>
	);
};

export default ToolbarChip;
