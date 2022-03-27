import React from 'react';
import { FC } from 'react';
import {
	ChallengeButton,
	EnemyContainer,
	EnemyName,
} from './enemy-list-item.styles';
import { EnemyListItemProps } from './types';
import { GiBattleAxe } from 'react-icons/gi';
import useActions from '../../../hooks/use-actions/use-actions.hook';

const EnemyListItem: FC<EnemyListItemProps> = ({ enemy }) => {
	const { sendGameChallenge } = useActions();
	const handleChallengeEnemy = () => {
		sendGameChallenge(enemy.uid);
	};

	return (
		<EnemyContainer>
			<EnemyName>{enemy.displayName}</EnemyName>
			<ChallengeButton onClick={handleChallengeEnemy} color="secondary">
				<GiBattleAxe size="30px" />
			</ChallengeButton>
		</EnemyContainer>
	);
};

export default EnemyListItem;
