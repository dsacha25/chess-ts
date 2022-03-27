import { ChessUser } from '../../utils/types/chess-user/chess-user';
import { EnemyTypes } from './enemies.types';

export interface SearchEnemiesStartAction {
	type: EnemyTypes.SEARCH_ENEMIES_START;
	payload: string;
}

export interface SearchEnemiesSuccessAction {
	type: EnemyTypes.SEARCH_ENEMIES_SUCCESS;
	payload: ChessUser[];
}

export interface ClearSearchResultAction {
	type: EnemyTypes.CLEAR_SEARCH_RESULT;
}

export interface FetchEnemyInfoStartAction {
	type: EnemyTypes.FETCH_ENEMY_INFO_START;
	payload: string;
}

export interface FetchEnemyInfoSuccessAction {
	type: EnemyTypes.FETCH_ENEMY_INFO_SUCCESS;
	payload: ChessUser;
}

export interface SendEnemyRequestAction {
	type: EnemyTypes.SEND_ENEMY_REQUEST;
	payload: string;
}

// FETCH ENEMIES
export interface FetchEnemiesStartAction {
	type: EnemyTypes.FETCH_ENEMIES_START;
}

export interface FetchEnemiesSuccessAction {
	type: EnemyTypes.FETCH_ENEMIES_SUCCESS;
	payload: ChessUser[];
}

export interface EnemyErrorAction {
	type: EnemyTypes.ENEMY_ERROR;
	payload: string;
}

type EnemyActions =
	| SearchEnemiesStartAction
	| SearchEnemiesSuccessAction
	| ClearSearchResultAction
	| FetchEnemyInfoStartAction
	| FetchEnemyInfoSuccessAction
	| SendEnemyRequestAction
	| FetchEnemiesStartAction
	| FetchEnemiesSuccessAction
	| EnemyErrorAction;

export default EnemyActions;
