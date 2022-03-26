import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectEnemy = (state: RootState) => state.enemy;

export const selectEnemySearchResults = createSelector(
	selectEnemy,
	(enemy) => enemy.enemySearchResults
);

export const selectEnemyInfo = createSelector(
	selectEnemy,
	(enemy) => enemy.enemyInfo
);
