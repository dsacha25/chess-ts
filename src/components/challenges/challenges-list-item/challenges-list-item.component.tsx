import React, { FC } from 'react';
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

const ChallengesListItem: FC<ChallengeItemProps> = ({ enemy }) => {
	const { acceptGameChallenge, rejectGameChallenge } = useActions();

	const handleAcceptChallenge = () => {
		acceptGameChallenge(enemy);
	};

	const handleRejectChallenge = () => {
		rejectGameChallenge(enemy.uid);
	};

	return (
		<ChallengeItem>
			<EnemyName>{enemy.displayName}</EnemyName>
			<AcceptChallengeButton onClick={handleAcceptChallenge} color="main">
				<GiBattleAxe size="30px" />
			</AcceptChallengeButton>
			<RejectChallengeButton onClick={handleRejectChallenge} color="secondary">
				<IoClose size="34px" />
			</RejectChallengeButton>
		</ChallengeItem>
	);
};

export default ChallengesListItem;
