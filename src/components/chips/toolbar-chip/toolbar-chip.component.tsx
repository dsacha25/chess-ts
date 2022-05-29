import React from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectChessUser,
	selectProfilePicture,
} from '../../../redux/user/user.selector';
import { AvatarChip } from '../avatar-chip/avatar-chip.styles';
import {
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
			<AvatarChip url={photoURL} />
			<ChipInfoContianer>
				<UserName>
					{chessUser ? chessUser.displayName : 'Noot McScooter'}
				</UserName>
				<Rating>{chessUser?.rating}</Rating>
			</ChipInfoContianer>
		</ToolbarChipContainer>
	);
};

export default ToolbarChip;
