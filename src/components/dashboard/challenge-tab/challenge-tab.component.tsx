import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../common/title/title.styles';
import {
	ButtonsContainer,
	ChallengeButton,
	ChallengesContainer,
} from './challenge-tab.styles';
import Paths from '../../../utils/types/paths/paths';

const ChallengeTab = () => {
	const navigate = useNavigate();
	return (
		<ChallengesContainer>
			<Title>Challenge Area</Title>
			<ButtonsContainer>
				<ChallengeButton
					onClick={() => navigate(`/${Paths.PLAY}`)}
					color="secondary"
				>
					Enter Gulag
				</ChallengeButton>
				<ChallengeButton
					onClick={() => navigate(`/${Paths.ANALYSIS}`)}
					color="main"
				>
					Play With Yourself
				</ChallengeButton>
			</ButtonsContainer>
			Challenge Someone to a Game
			<p>You'll probably lose, but you might as well try anyways!</p>
		</ChallengesContainer>
	);
};

export default ChallengeTab;
