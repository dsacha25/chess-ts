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

export interface FetchEnemyInfoStartAction {
	type: EnemyTypes.FETCH_ENEMY_INFO_START;
	payload: string;
}

export interface FetchEnemyInfoSuccessAction {
	type: EnemyTypes.FETCH_ENEMY_INFO_SUCCESS;
	payload: ChessUser;
}

export interface EnemyErrorAction {
	type: EnemyTypes.ENEMY_ERROR;
	payload: string;
}

type EnemyActions =
	| SearchEnemiesStartAction
	| SearchEnemiesSuccessAction
	| FetchEnemyInfoStartAction
	| FetchEnemyInfoSuccessAction
	| EnemyErrorAction;

export default EnemyActions;
