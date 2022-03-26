import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemySearchResults } from '../../../redux/enemies/enemies.selector';
import SearchInput from '../../common/inputs/search-input/search-input.component';
import Title from '../../common/title/title.styles';
import { EnemiesContainer } from './enemies-tab.styles';

const EnemiesTab = () => {
	const { searchEnemiesStart } = useActions();
	const searchResult = useSelector((state) => selectEnemySearchResults(state));

	const { register, handleSubmit } = useForm<{ query: string }>();
	const onSubmit: SubmitHandler<{ query: string }> = (data) => {
		console.log('QUERY: ', data);
		searchEnemiesStart(data.query);
	};
	return (
		<EnemiesContainer>
			<Title>Enemies</Title>
			<SearchInput
				register={register}
				onSubmit={handleSubmit(onSubmit)}
				name="query"
				label="Search for Enemies"
			/>

			{searchResult.length > 0 ? (
				<div>
					{searchResult.map((enemy) => (
						<div>{enemy.displayName}</div>
					))}
				</div>
			) : (
				<p>
					0 Enemies found. <br /> Find more enemies you fucking loser!!!
				</p>
			)}
		</EnemiesContainer>
	);
};

export default EnemiesTab;
