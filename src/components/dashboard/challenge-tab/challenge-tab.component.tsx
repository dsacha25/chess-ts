import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../common/title/title.styles';
import {
	ButtonsContainer,
	ChallengeButton,
	ChallengesContainer,
	ListsContainer,
} from './challenge-tab.styles';
import Paths from '../../../utils/types/paths/paths';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import ChallengesList from '../../challenges/challenges-list/challenges-list.component';
import ActiveGamesList from '../../games/active-games/active-games-list/active-games-list.component';
import InactiveGamesList from '../../games/inactive-games/inactive-games-list/inactive-games-list.component';

const ChallengeTab = () => {
	const navigate = useNavigate();
	const {
		fetchGameChallengesStart,
		fetchActiveGamesStart,
		fetchInactiveGamesStart,
	} = useActions();

	useEffect(() => {
		fetchGameChallengesStart();
		fetchActiveGamesStart();
		fetchInactiveGamesStart();

		// eslint-disable-next-line
	}, []);

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
				<ChallengeButton onClick={() => navigate(`/${Paths.AI}`)} color="light">
					Practice Sucking
				</ChallengeButton>
				<ChallengeButton
					onClick={() => navigate(`/${Paths.ANALYSIS}`)}
					color="main"
				>
					Play With Yourself
				</ChallengeButton>
			</ButtonsContainer>
			Challenge Someone to a Game
			<ListsContainer>
				<ChallengesList />
				<ActiveGamesList />
				<InactiveGamesList />
			</ListsContainer>
		</ChallengesContainer>
	);
};

export default ChallengeTab;
