import React from 'react';
import Title from '../../common/title/title.styles';
import { EnemiesContainer } from './enemies-tab.styles';

const EnemiesTab = () => {
	return (
		<EnemiesContainer>
			<Title>Enemies</Title>
			<p>A list of all your enemies.</p>

			<p>
				0 Enemies found. <br /> Find more enemies you fucking loser!!!
			</p>
		</EnemiesContainer>
	);
};

export default EnemiesTab;
