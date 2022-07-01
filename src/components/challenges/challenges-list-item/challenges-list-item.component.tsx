import React, { FC, useState } from 'react';
import {
	AcceptChallengeButton,
	ChallengeItem,
	ChallengeResponses,
	EnemyInfo,
	EnemyName,
	GameMode,
	RejectChallengeButton,
} from './challenges-list-item.styles';
import { ChallengeItemProps } from './types';
import { GiBattleAxe } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectGameLoadingState } from '../../../redux/game/game.selector';
import Spinner from '../../common/spinner/spinner.component';
import parseGameMode from '../../../utils/helpers/parsers/parse-game-mode/parse-game-mode';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../utils/types/paths/paths';

const ChallengesListItem: FC<ChallengeItemProps> = ({ enemy }) => {
	const navigate = useNavigate();
	const { acceptGameChallengeStart, rejectGameChallenge } = useActions();

	const loading = useSelector((state) => selectGameLoadingState(state));

	const [accepting, setAccepting] = useState(false);
	const [rejecting, setRejecting] = useState(false);

	const handleNavigate = (gameUID: string) => {
		navigate(`/${Paths.PLAY}?game=${gameUID}`);
	};

	const handleAcceptChallenge = () => {
		setAccepting(true);
		acceptGameChallengeStart(enemy, handleNavigate);
	};

	const handleRejectChallenge = () => {
		setRejecting(true);
		rejectGameChallenge(enemy.uid);
	};

	return (
		<ChallengeItem>
			<EnemyInfo>
				<EnemyName>{enemy.displayName}</EnemyName>
				<GameMode>{parseGameMode(enemy.gameMode)}</GameMode>
			</EnemyInfo>
			<ChallengeResponses>
				<AcceptChallengeButton
					onClick={handleAcceptChallenge}
					color="main"
					disabled={rejecting}
				>
					{loading && accepting ? (
						<Spinner size="30px" />
					) : (
						<GiBattleAxe size="30px" />
					)}
				</AcceptChallengeButton>
				<RejectChallengeButton
					onClick={handleRejectChallenge}
					color="secondary"
					disabled={accepting}
				>
					{loading && rejecting ? (
						<Spinner size="30px" />
					) : (
						<IoClose size="34px" />
					)}
				</RejectChallengeButton>
			</ChallengeResponses>
		</ChallengeItem>
	);
};

export default ChallengesListItem;
