import React, { FC, useState } from 'react';
import {
	AcceptChallengeButton,
	ChallengeItem,
	EnemyName,
	RejectChallengeButton,
} from './challenges-list-item.styles';
import { ChallengeItemProps } from './types';
import { GiBattleAxe } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectGameLoadingState } from '../../../redux/game/game.selector';
import Spinner from '../../common/spinner/spinner.component';

const ChallengesListItem: FC<ChallengeItemProps> = ({ enemy }) => {
	const loading = useSelector((state) => selectGameLoadingState(state));
	const { acceptGameChallengeStart, rejectGameChallenge } = useActions();
	const [accepting, setAccepting] = useState(false);
	const [rejecting, setRejecting] = useState(false);

	const handleAcceptChallenge = () => {
		setAccepting(true);
		acceptGameChallengeStart(enemy);
	};

	const handleRejectChallenge = () => {
		setRejecting(true);
		rejectGameChallenge(enemy.uid);
	};

	return (
		<ChallengeItem>
			<EnemyName>{enemy.displayName}</EnemyName>
			<AcceptChallengeButton onClick={handleAcceptChallenge} color="main">
				{loading && accepting ? (
					<Spinner size="30px" />
				) : (
					<GiBattleAxe size="30px" />
				)}
			</AcceptChallengeButton>
			<RejectChallengeButton onClick={handleRejectChallenge} color="secondary">
				{loading && rejecting ? (
					<Spinner size="30px" />
				) : (
					<IoClose size="34px" />
				)}
			</RejectChallengeButton>
		</ChallengeItem>
	);
};

export default ChallengesListItem;
