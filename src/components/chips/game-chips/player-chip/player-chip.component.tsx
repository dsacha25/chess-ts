import React, { useState } from 'react';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectChessUser } from '../../../../redux/user/user.selector';
import {
	PlayerChipAvatar,
	PlayerChipContainer,
	PlayerChipInfo,
	ChipUserName,
	ChipRating,
} from './player-chip.styles';

const PlayerChip = () => {
	const chessUser = useSelector((state) => selectChessUser(state));

	return (
		<PlayerChipContainer>
			<PlayerChipAvatar url={chessUser?.photoURL} />
			<PlayerChipInfo>
				<ChipRating>{chessUser?.rating}</ChipRating>

				<ChipUserName>{chessUser?.displayName}</ChipUserName>
			</PlayerChipInfo>
		</PlayerChipContainer>
	);
};

export default PlayerChip;
