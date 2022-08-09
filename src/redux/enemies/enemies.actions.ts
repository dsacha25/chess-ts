import { ChessUser } from '../../utils/types/users/chess-user/chess-user';
import {
	ClearEnemyInfoAction,
	ClearSearchResultAction,
	EnemyErrorAction,
	FetchEnemiesStartAction,
	FetchEnemiesSuccessAction,
	OpenEnemyInfoListenerAction,
	FetchEnemyInfoSuccessAction,
	SearchEnemiesStartAction,
	SearchEnemiesSuccessAction,
	SendEnemyRequestAction,
	CloseEnemyInfoListenerAction,
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

export const clearSearchResult = (): ClearSearchResultAction => ({
	type: EnemyTypes.CLEAR_SEARCH_RESULT,
});

// ==== ENEMY INFO
export const openEnemyInfoListener = (
	enemyUID: string
): OpenEnemyInfoListenerAction => ({
	type: EnemyTypes.OPEN_ENEMY_INFO_LISTENER,
	payload: enemyUID,
});

export const fetchEnemyInfoSuccess = (
	enemy: ChessUser
): FetchEnemyInfoSuccessAction => ({
	type: EnemyTypes.FETCH_ENEMY_INFO_SUCCESS,
	payload: enemy,
});

export const closeEnemyInfoListener = (): CloseEnemyInfoListenerAction => ({
	type: EnemyTypes.CLOSE_ENEMY_INFO_LISTENER,
});

export const clearEnemyInfo = (): ClearEnemyInfoAction => ({
	type: EnemyTypes.CLEAR_ENEMY_INFO,
});

// ==== SEND ENEMY REQUEST
export const sendEnemyRequest = (enemyUID: string): SendEnemyRequestAction => ({
	type: EnemyTypes.SEND_ENEMY_REQUEST,
	payload: enemyUID,
});

// FETCH ENEMIES
export const fetchEnemiesStart = (): FetchEnemiesStartAction => ({
	type: EnemyTypes.FETCH_ENEMIES_START,
});

export const fetchEnemiesSuccess = (
	enemies: ChessUser[]
): FetchEnemiesSuccessAction => ({
	type: EnemyTypes.FETCH_ENEMIES_SUCCESS,
	payload: enemies,
});

export const enemyError = (error: string): EnemyErrorAction => ({
	type: EnemyTypes.ENEMY_ERROR,
	payload: error,
});
