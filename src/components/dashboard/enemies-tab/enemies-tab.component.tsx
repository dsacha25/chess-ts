import React from 'react';
import SearchInput from '../../common/inputs/search-input/search-input.component';
import Title from '../../common/title/title.styles';
import { EnemiesContainer } from './enemies-tab.styles';

const EnemiesTab = () => {
	const handleEnemySearch = () => {
		//
	};
	return (
		<EnemiesContainer>
			<Title>Enemies</Title>
			<SearchInput onSubmit={handleEnemySearch} label="Search for Enemies" />

			<p>
				0 Enemies found. <br /> Find more enemies you fucking loser!!!
			</p>
		</EnemiesContainer>
	);
};

export default EnemiesTab;
