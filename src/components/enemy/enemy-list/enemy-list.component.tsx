import React from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemies } from '../../../redux/enemies/enemies.selector';
import Title from '../../common/title/title.styles';
import EnemyListItem from '../enemy-list-item/enemy-list-item.component';
import { EnemyListContainer } from './enemy-list.styles';

const EnemyList = () => {
	const enemies = useSelector((state) => selectEnemies(state));

	if (enemies.length === 0) return null;

	return (
		<EnemyListContainer>
			<Title fontSize="30px">Enmities</Title>
			{enemies.map((enemy, i) => (
				<EnemyListItem key={i} enemy={enemy} />
			))}
		</EnemyListContainer>
	);
};

export default EnemyList;
