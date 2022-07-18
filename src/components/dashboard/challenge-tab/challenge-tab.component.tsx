import React, { MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	ButtonsContainer,
	ChallengeButton,
	ChallengeLabel,
	ChallengesContainer,
	ListsContainer,
} from './challenge-tab.styles';
import Paths from '../../../utils/types/util/paths/paths';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import ChallengesList from '../../challenges/challenges-list/challenges-list.component';
import ActiveGamesList from '../../games/active-games/active-games-list/active-games-list.component';
import InactiveGamesList from '../../games/inactive-games/inactive-games-list/inactive-games-list.component';

import { GiBattleAxe } from 'react-icons/gi';
import { ImSad2 } from 'react-icons/im';
import { BsCpuFill } from 'react-icons/bs';
import { TabTitle } from '../tab-styles/tab-styles..styles';

const ChallengeTab = () => {
	const navigate = useNavigate();
	const {
		fetchGameChallengesStart,
		fetchActiveGamesStart,
		fetchInactiveGamesStart,
		setGameType,
	} = useActions();

	const handleGameSelection = (e: MouseEvent<HTMLButtonElement>) => {
		setGameType('solo');
		navigate(`/${Paths.ANALYSIS}`);
	};

	useEffect(() => {
		fetchGameChallengesStart();
		fetchActiveGamesStart();
		fetchInactiveGamesStart();

		// eslint-disable-next-line
	}, []);

	return (
		<ChallengesContainer>
			<TabTitle>Challenge Area</TabTitle>
			<ButtonsContainer>
				<ChallengeButton
					id="gulag"
					onClick={() => navigate(`/${Paths.GULAG}`)}
					color="secondary"
				>
					<ChallengeLabel>Gulag</ChallengeLabel>
					<GiBattleAxe size="30px" />
				</ChallengeButton>
				<ChallengeButton
					id="ai"
					onClick={() => navigate(`/${Paths.AI}`)}
					color="light"
				>
					<ChallengeLabel>AI</ChallengeLabel>
					<BsCpuFill color="black" size="30px" />
				</ChallengeButton>
				<ChallengeButton id="solo" onClick={handleGameSelection} color="main">
					<ChallengeLabel>Solo</ChallengeLabel>
					<ImSad2 size="30px" />
				</ChallengeButton>
			</ButtonsContainer>
			<ListsContainer>
				<ChallengesList />
				<ActiveGamesList />
				<InactiveGamesList />
			</ListsContainer>
		</ChallengesContainer>
	);
};

export default ChallengeTab;
