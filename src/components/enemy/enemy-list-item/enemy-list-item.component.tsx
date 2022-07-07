import React, { useState } from 'react';
import { FC } from 'react';
import {
	ChallengeButton,
	EnemyContainer,
	EnemyName,
	EnemyRating,
} from './enemy-list-item.styles';
import { EnemyListItemProps } from './types';
import { GiBattleAxe } from 'react-icons/gi';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectGameInviteReceiver,
	selectGameLoadingState,
	selectPendingChallenges,
} from '../../../redux/game/game.selector';
import { find } from 'lodash';
import Spinner from '../../common/spinner/spinner.component';
import GameModeSelector from '../../games/pre-game-interfaces/game-mode-selector/game-mode-selector.component';
import Paths from '../../../utils/types/paths/paths';
import useActions from '../../../hooks/use-actions/use-actions.hook';

const EnemyListItem: FC<EnemyListItemProps> = ({ enemy }) => {
	const { setDashboardIndex } = useActions();
	const [open, setOpen] = useState(false);
	const isLoading = useSelector((state) => selectGameLoadingState(state));
	const receiver = useSelector((state) => selectGameInviteReceiver(state));
	const pendingChallenges = useSelector((state) =>
		selectPendingChallenges(state)
	);

	const handleClose = () => {
		setOpen(false);
		setDashboardIndex(0);
	};

	if (!enemy) return null;

	return (
		<EnemyContainer>
			<EnemyName>{enemy.displayName}</EnemyName>
			<EnemyRating>({enemy.rating})</EnemyRating>
			<ChallengeButton
				onClick={() => setOpen(true)}
				color="secondary"
				disabled={
					find(pendingChallenges, ['enemyUID', enemy.uid]) !== undefined || open
				}
			>
				{isLoading && receiver === enemy.uid ? (
					<Spinner size="36px" />
				) : (
					<GiBattleAxe size="30px" />
				)}
			</ChallengeButton>
			{open && (
				<GameModeSelector enemyUID={enemy.uid} handleClose={handleClose} />
			)}
		</EnemyContainer>
	);
};

export default EnemyListItem;
