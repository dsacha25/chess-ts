import React, { FC } from 'react';
import {
	AddEnemyButton,
	EnemyName,
	SearchResultContainer,
} from './enemy-search-result.styles';
import { EnemySearchResultProps } from './types';
import { IoAdd } from 'react-icons/io5';

const EnemySearchResult: FC<EnemySearchResultProps> = ({ enemy }) => {
	const handleSendEnemyRequest = () => {
		//
	};
	return (
		<SearchResultContainer>
			<EnemyName>{enemy.displayName}</EnemyName>
			<AddEnemyButton onClick={handleSendEnemyRequest} color="light">
				<IoAdd size="30px" />
			</AddEnemyButton>
		</SearchResultContainer>
	);
};

export default EnemySearchResult;
