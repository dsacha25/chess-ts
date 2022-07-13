import React, { useEffect } from 'react';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemies } from '../../../redux/enemies/enemies.selector';
import Title from '../../common/title/title.styles';
import EnemyListItem from '../enemy-list-item/enemy-list-item.component';
import { EnemyListContainer } from './enemy-list.styles';

const EnemyList = () => {
	const { fetchPendingChallengesStart } = useActions();

	const enemies = useSelector((state) => selectEnemies(state));

	useEffect(() => {
		fetchPendingChallengesStart();
		// eslint-disable-next-line
	}, []);

	if (enemies.length === 0) return null;

	return (
		<EnemyListContainer>
			<Title fontSize="30px">Enemy List:</Title>
			{enemies.map((enemy, i) => (
				<EnemyListItem key={i} enemy={enemy} />
			))}
		</EnemyListContainer>
	);
};

export default EnemyList;
