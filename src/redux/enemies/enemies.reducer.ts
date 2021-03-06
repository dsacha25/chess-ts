import EnemyActions from './enemies.action-types';
import { EnemyTypes } from './enemies.types';
import { produce } from 'immer';
import { ChessUser } from '../../utils/types/users/chess-user/chess-user';

export interface EnemyState {
	enemySearchResults: ChessUser[];
	enemyInfo: ChessUser | null;
	enemies: ChessUser[];
	error: string;
}

const INITIAL_STATE: EnemyState = {
	enemySearchResults: [],
	enemyInfo: null,
	enemies: [],
	error: '',
};

const enemyReducer = produce(
	(state: EnemyState = INITIAL_STATE, action: EnemyActions) => {
		switch (action.type) {
			case EnemyTypes.FETCH_ENEMY_INFO_SUCCESS:
				state.enemyInfo = action.payload;
				state.error = '';
				return state;
			case EnemyTypes.CLEAR_ENEMY_INFO:
				state.enemyInfo = null;
				return state;
			case EnemyTypes.SEARCH_ENEMIES_SUCCESS:
				state.enemySearchResults = action.payload;
				state.error = '';
				return state;
			case EnemyTypes.CLEAR_SEARCH_RESULT:
				state.enemySearchResults = [];
				return state;
			case EnemyTypes.FETCH_ENEMIES_SUCCESS:
				state.enemies = action.payload;
				return state;
			case EnemyTypes.ENEMY_ERROR:
				state.error = action.payload;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default enemyReducer;
