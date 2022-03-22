import React from 'react';
import Title from '../../common/title/title.styles';
import { ChallengesContainer } from './challenge-tab.styles';

const ChallengeTab = () => {
	return (
		<ChallengesContainer>
			<Title>Challenge Area</Title>
			Challenge Someone to a Game
			<p>You'll probably lose, but you might as well try anyways!</p>
		</ChallengesContainer>
	);
};

export default ChallengeTab;
