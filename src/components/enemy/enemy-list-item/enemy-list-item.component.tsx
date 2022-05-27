import React, { useEffect } from 'react';
import { FC } from 'react';
import {
	ChallengeButton,
	EnemyContainer,
	EnemyName,
	EnemyRating,
} from './enemy-list-item.styles';
import { EnemyListItemProps } from './types';
import { GiBattleAxe } from 'react-icons/gi';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectGameInviteReceiver,
	selectGameLoadingState,
	selectPendingChallenges,
} from '../../../redux/game/game.selector';
import { find } from 'lodash';
import Spinner from '../../common/spinner/spinner.component';

const EnemyListItem: FC<EnemyListItemProps> = ({ enemy }) => {
	const isLoading = useSelector((state) => selectGameLoadingState(state));
	const receiver = useSelector((state) => selectGameInviteReceiver(state));
	const pendingChallenges = useSelector((state) =>
		selectPendingChallenges(state)
	);

	const { sendGameChallenge } = useActions();
	const handleChallengeEnemy = () => {
		sendGameChallenge(enemy.uid);
	};

	if (!enemy) return null;

	return (
		<EnemyContainer>
			<EnemyName>{enemy.displayName}</EnemyName>
			<EnemyRating>({enemy.rating})</EnemyRating>
			<ChallengeButton
				onClick={handleChallengeEnemy}
				color="secondary"
				disabled={
					find(pendingChallenges, ['enemyUID', enemy.uid]) !== undefined
				}
			>
				{isLoading && receiver === enemy.uid ? (
					<Spinner size="36px" />
				) : (
					<GiBattleAxe size="30px" />
				)}
			</ChallengeButton>
		</EnemyContainer>
	);
};

export default EnemyListItem;
