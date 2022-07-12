import { ClickAwayListener } from '@material-ui/core';
import React, { FC, MouseEvent } from 'react';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import GameModeTypes from '../../../../utils/types/game-mode-type/game-mode-type';
import Title from '../../../common/title/title.styles';
import {
	ChallengeButton,
	GameTypeSelectorContainer,
} from './game-mode-selector.styles';
import { GameModeSelectorProps } from './types';
import { IoClose } from 'react-icons/io5';

const GameModeSelector: FC<GameModeSelectorProps> = ({
	enemyUID,
	handleClose,
}) => {
	const { sendGameChallenge } = useActions();

	const handleChallengeRequest = (e: MouseEvent<HTMLButtonElement>) => {
		const gameMode = e.currentTarget.value as GameModeTypes;

		sendGameChallenge(enemyUID, gameMode);

		handleClose();
	};

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<GameTypeSelectorContainer>
				<Title fontSize="30px">Select Game Mode</Title>
				<ChallengeButton
					value="untimed"
					onClick={handleChallengeRequest}
					color="light"
				>
					Untimed
				</ChallengeButton>
				<ChallengeButton
					value="five_minute"
					onClick={handleChallengeRequest}
					color="light"
				>
					5 min
				</ChallengeButton>
				<ChallengeButton
					value="five_by_five"
					onClick={handleChallengeRequest}
					color="light"
				>
					5 | 5
				</ChallengeButton>
				<ChallengeButton
					value="ten_minute"
					onClick={handleChallengeRequest}
					color="main"
				>
					10 min
				</ChallengeButton>
				<ChallengeButton
					value="ten_by_fifteen"
					onClick={handleChallengeRequest}
					color="main"
				>
					10 | 15
				</ChallengeButton>
				<ChallengeButton
					value="one_day"
					onClick={handleChallengeRequest}
					color="secondary"
				>
					One Day
				</ChallengeButton>
				<ChallengeButton
					value="three_day"
					onClick={handleChallengeRequest}
					color="secondary"
				>
					Three Day
				</ChallengeButton>
				<ChallengeButton onClick={handleClose}>
					<IoClose size="40px" color="black" />
				</ChallengeButton>
			</GameTypeSelectorContainer>
		</ClickAwayListener>
	);
};

export default GameModeSelector;
