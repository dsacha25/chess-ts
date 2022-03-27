import React from 'react';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemyInfo } from '../../../../redux/enemies/enemies.selector';
import {
	ChipRating,
	OpponentChipAvatar,
	OpponentChipContainer,
	OpponentChipInfo,
	OpponentUserName,
} from './opponent-chip.styles';

const OpponentChip = () => {
	const enemy = useSelector((state) => selectEnemyInfo(state));

	if (!enemy) return null;
	return (
		<OpponentChipContainer>
			<OpponentChipAvatar url={enemy.photoURL} />
			<OpponentChipInfo>
				<OpponentUserName>{enemy.displayName}</OpponentUserName>
				<ChipRating>{enemy.rating}</ChipRating>
			</OpponentChipInfo>
		</OpponentChipContainer>
	);
};

export default OpponentChip;
