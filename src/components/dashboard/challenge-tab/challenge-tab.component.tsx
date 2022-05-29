import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../common/title/title.styles';
import {
	ButtonsContainer,
	ChallengeButton,
	ChallengesContainer,
	ListsContainer,
	TabTitle,
} from './challenge-tab.styles';
import Paths from '../../../utils/types/paths/paths';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import ChallengesList from '../../challenges/challenges-list/challenges-list.component';
import ActiveGamesList from '../../games/active-games/active-games-list/active-games-list.component';
import InactiveGamesList from '../../games/inactive-games/inactive-games-list/inactive-games-list.component';

import { GiBattleAxe } from 'react-icons/gi';
import { ImSad2 } from 'react-icons/im';
import { MdComputer } from 'react-icons/md';
import useWindowSize from '../../../hooks/use-window-size/use-window-size.hook';

const ChallengeTab = () => {
	const navigate = useNavigate();
	const { width } = useWindowSize();
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
			<TabTitle>Challenge Area</TabTitle>
			<ButtonsContainer>
				<ChallengeButton
					onClick={() => navigate(`/${Paths.PLAY}`)}
					color="secondary"
					disabled
				>
					{width > 980 && 'Gulag'}
					<GiBattleAxe size="30px" />
				</ChallengeButton>
				<ChallengeButton onClick={() => navigate(`/${Paths.AI}`)} color="light">
					{width > 980 && 'AI'}
					<MdComputer size="30px" />
				</ChallengeButton>
				<ChallengeButton
					onClick={() => navigate(`/${Paths.ANALYSIS}`)}
					color="main"
				>
					{width > 980 && 'Solo'}
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
