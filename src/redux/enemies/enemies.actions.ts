import { ChessUser } from '../../utils/types/chess-user/chess-user';
import {
	EnemyErrorAction,
	FetchEnemyInfoStartAction,
	FetchEnemyInfoSuccessAction,
	SearchEnemiesStartAction,
	SearchEnemiesSuccessAction,
} from './enemies.action-types';
import { EnemyTypes } from './enemies.types';

export const searchEnemiesStart = (
	query: string
): SearchEnemiesStartAction => ({
	type: EnemyTypes.SEARCH_ENEMIES_START,
	payload: query,
});

export const searchEnemiesSuccess = (
	enemies: ChessUser[]
): SearchEnemiesSuccessAction => ({
	type: EnemyTypes.SEARCH_ENEMIES_SUCCESS,
	payload: enemies,
});

export const fetchEnemyInfoStart = (
	uid: string
): FetchEnemyInfoStartAction => ({
	type: EnemyTypes.FETCH_ENEMY_INFO_START,
	payload: uid,
});

export const fetchEnemyInfoSuccess = (
	enemy: ChessUser
): FetchEnemyInfoSuccessAction => ({
	type: EnemyTypes.FETCH_ENEMY_INFO_SUCCESS,
	payload: enemy,
});

export const enemyError = (error: string): EnemyErrorAction => ({
	type: EnemyTypes.ENEMY_ERROR,
	payload: error,
});
