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

export const selectEnemies = createSelector(
	selectEnemy,
	(enemy) => enemy.enemies
);

export const selectEnemyError = createSelector(
	selectEnemy,
	(enemy) => enemy.error
);
