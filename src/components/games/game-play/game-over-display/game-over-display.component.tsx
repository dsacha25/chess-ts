import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../utils/types/paths/paths';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';
import Title from '../../../common/title/title.styles';
import { GameOverContainer } from './game-over-display.styles';
import { GameOverDisplayProps } from './types';

export const GameOverDisplay: FC<GameOverDisplayProps> = ({ winner }) => {
	const navigate = useNavigate();

	return (
		<GameOverContainer>
			<Title>{winner} won!</Title>
			<CustomButton
				onClick={() => navigate(`/${Paths.DASHBOARD}`)}
				color="main"
			>
				Play Again?
			</CustomButton>
		</GameOverContainer>
	);
};
