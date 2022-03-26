import { ClickAwayListener } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemySearchResults } from '../../../redux/enemies/enemies.selector';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import SearchInput from '../../common/inputs/search-input/search-input.component';
import Title from '../../common/title/title.styles';
import EnemySearchResult from '../../enemy/enemy-search-result/enemy-search-result.component';
import { EnemiesContainer } from './enemies-tab.styles';

const EnemiesTab = () => {
	const { searchEnemiesStart } = useActions();
	const searchResult = useSelector((state) => selectEnemySearchResults(state));

	const { register, handleSubmit, watch } = useForm<{ query: string }>();
	const onSubmit: SubmitHandler<{ query: string }> = (data) => {
		console.log('QUERY: ', data);
		searchEnemiesStart(data.query);
	};

	const [open, setOpen] = useState(false);

	return (
		<EnemiesContainer>
			<Title>Enemies</Title>
			<SearchInput
				register={register}
				onSubmit={handleSubmit(onSubmit)}
				name="query"
				label="Search for Enemies"
				hasData={!!watch('query')}
			/>

			{searchResult.length > 0 ? (
				<Fragment>
					{searchResult.map((enemy) => (
						<EnemySearchResult enemy={enemy} />
					))}
				</Fragment>
			) : (
				<p>
					0 Enemies found. <br /> Find more enemies you fucking loser!!!
					<div style={{ position: 'absolute', top: 0 }}>
						<ClickAwayListener onClickAway={() => setOpen(false)}>
							<div>
								<CustomButton onClick={() => setOpen(!open)} color="main">
									Open
								</CustomButton>

								{open ? (
									<div
										style={{
											width: '300px',
											height: '300px',
											border: '1px solid black',
										}}
									>
										{' '}
										Click On Me!!!{' '}
									</div>
								) : null}
							</div>
						</ClickAwayListener>
					</div>
				</p>
			)}
		</EnemiesContainer>
	);
};

export default EnemiesTab;
