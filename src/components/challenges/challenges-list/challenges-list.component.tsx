import React from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectGameChallenges } from '../../../redux/game/game.selector';
import Title from '../../common/title/title.styles';
import ChallengesListItem from '../challenges-list-item/challenges-list-item.component';
import { ChallengesListContainer } from './challenges-list.styles';

const ChallengesList = () => {
	const challenges = useSelector((state) => selectGameChallenges(state));
	return (
		<ChallengesListContainer>
			<Title fontSize="30px">Challenges</Title>
			{challenges.map((challenge, i) => (
				<ChallengesListItem key={i} enemy={challenge} />
			))}
		</ChallengesListContainer>
	);
};

export default ChallengesList;
