import React, { FC } from 'react';
import {
	AddEnemyButton,
	EnemyName,
	SearchResultContainer,
} from './enemy-search-result.styles';
import { EnemySearchResultProps } from './types';
import { IoAdd } from 'react-icons/io5';
import useActions from '../../../hooks/use-actions/use-actions.hook';

const EnemySearchResult: FC<EnemySearchResultProps> = ({ enemy }) => {
	const { sendEnemyRequest, clearSearchResult } = useActions();

	const handleSendEnemyRequest = () => {
		sendEnemyRequest(enemy.uid);
		clearSearchResult();
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
