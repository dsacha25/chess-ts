import React from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectGameChallenges } from '../../../redux/game/game.selector';
import { List } from '../../common/lists/list/list.styles';
import Title from '../../common/title/title.styles';
import ChallengesListItem from '../challenges-list-item/challenges-list-item.component';
import { ChallengesListContainer } from './challenges-list.styles';

const ChallengesList = () => {
	const challenges = useSelector((state) => selectGameChallenges(state));

	if (challenges.length === 0) return null;

	return (
		<List>
			<Title fontSize="30px">Challenges</Title>
			{challenges.map((challenge, i) => (
				<ChallengesListItem key={i} enemy={challenge} />
			))}
		</List>
	);
};

export default ChallengesList;
