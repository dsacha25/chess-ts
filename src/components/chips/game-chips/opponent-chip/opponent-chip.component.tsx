import React from 'react';
import {
	ChipRating,
	OpponentChipAvatar,
	OpponentChipContainer,
	OpponentChipInfo,
	OpponentUserName,
} from './opponent-chip.styles';

const OpponentChip = () => {
	return (
		<OpponentChipContainer>
			<OpponentChipAvatar />
			<OpponentChipInfo>
				<OpponentUserName>David Sacha</OpponentUserName>
				<ChipRating>800</ChipRating>
			</OpponentChipInfo>
		</OpponentChipContainer>
	);
};

export default OpponentChip;
