import React, { Fragment, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemySearchResults } from '../../../redux/enemies/enemies.selector';
import SearchInput from '../../common/inputs/search-input/search-input.component';
import Title from '../../common/title/title.styles';
import EnemyList from '../../enemy/enemy-list/enemy-list.component';
import EnemyRequestsList from '../../enemy/enemy-requests-list/enemy-requests-list.component';
import EnemySearchResult from '../../enemy/enemy-search-result/enemy-search-result.component';
import { TabTitle } from '../challenge-tab/challenge-tab.styles';
import { EnemiesContainer, EnemySearchContainer } from './enemies-tab.styles';

const EnemiesTab = () => {
	const { searchEnemiesStart, fetchEnemyRequestsStart, fetchEnemiesStart } =
		useActions();
	const searchResult = useSelector((state) => selectEnemySearchResults(state));

	const { register, handleSubmit, watch } = useForm<{ query: string }>();
	const onSubmit: SubmitHandler<{ query: string }> = (data) => {
		console.log('QUERY: ', data);
		searchEnemiesStart(data.query);
	};

	useEffect(() => {
		fetchEnemyRequestsStart();
		fetchEnemiesStart();

		// eslint-disable-next-line
	}, []);

	return (
		<EnemiesContainer>
			<TabTitle>Enemies</TabTitle>
			<EnemySearchContainer>
				<SearchInput
					register={register}
					onSubmit={handleSubmit(onSubmit)}
					name="query"
					label="Search for Enemies"
					hasData={!!watch('query')}
				/>

				{searchResult.length > 0 && (
					<Fragment>
						{searchResult.map((enemy) => (
							<EnemySearchResult enemy={enemy} />
						))}
					</Fragment>
				)}
			</EnemySearchContainer>
			<EnemyRequestsList />
			<EnemyList />
		</EnemiesContainer>
	);
};

export default EnemiesTab;
