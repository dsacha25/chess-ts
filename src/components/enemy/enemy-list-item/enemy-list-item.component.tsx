import React, { useEffect } from 'react';
import { FC } from 'react';
import {
	ChallengeButton,
	EnemyContainer,
	EnemyName,
} from './enemy-list-item.styles';
import { EnemyListItemProps } from './types';
import { GiBattleAxe } from 'react-icons/gi';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectPendingChallenges } from '../../../redux/game/game.selector';
import { find, includes } from 'lodash';

const EnemyListItem: FC<EnemyListItemProps> = ({ enemy }) => {
	const pendingChallenges = useSelector((state) =>
		selectPendingChallenges(state)
	);

	const { sendGameChallenge } = useActions();
	const handleChallengeEnemy = () => {
		sendGameChallenge(enemy.uid);
	};

	return (
		<EnemyContainer>
			<EnemyName>{enemy.displayName}</EnemyName>
			<ChallengeButton
				onClick={handleChallengeEnemy}
				color="secondary"
				disabled={
					find(pendingChallenges, ['enemyUID', enemy.uid]) !== undefined
				}
			>
				<GiBattleAxe size="30px" />
			</ChallengeButton>
		</EnemyContainer>
	);
};

export default EnemyListItem;
