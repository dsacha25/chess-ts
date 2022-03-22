import React from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectChessUser,
	selectProfilePicture,
} from '../../../redux/user/user.selector';
import {
	ChipAvatar,
	ChipInfoContianer,
	Rating,
	ToolbarChipContainer,
	UserName,
} from './toolbar-chip.styles';

const ToolbarChip = () => {
	const photoURL = useSelector((state) => selectProfilePicture(state));
	const chessUser = useSelector((state) => selectChessUser(state));
	return (
		<ToolbarChipContainer>
			<ChipAvatar url={photoURL} />
			<ChipInfoContianer>
				<UserName>
					{chessUser ? chessUser.displayName : 'Noot McScooter'}
				</UserName>
				<Rating>{chessUser ? chessUser.rating : 800}</Rating>
			</ChipInfoContianer>
		</ToolbarChipContainer>
	);
};

export default ToolbarChip;
