import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../utils/types/paths/paths';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';
import Title from '../../../common/title/title.styles';
import { GameOverContainer } from './game-over-display.styles';

export const GameOverDisplay = () => {
	const navigate = useNavigate();

	return (
		<GameOverContainer>
			<Title>Game Over, Bitch</Title>
			<CustomButton
				onClick={() => navigate(`/${Paths.DASHBOARD}`)}
				color="main"
			>
				Play Again?
			</CustomButton>
		</GameOverContainer>
	);
};
