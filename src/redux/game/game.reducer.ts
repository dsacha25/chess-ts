import { Move } from 'chess.js';
import GameType from '../../utils/types/game-type/game-type';
import Orientation from '../../utils/types/orientation/orientation';
import GameActions from './game.action-types';
import { GameTypes } from './game.types';
import { produce } from 'immer';
import { chunk, map } from 'lodash';

export interface GameState {
	fen: string;
	history: Move[];
	gameType: GameType;
	orientation: Orientation;
}

const INITIAL_STATE: GameState = {
	fen: 'start',
	history: [],
	gameType: 'solo',
	orientation: 'white',
};

const gameReducer = produce(
	(state: GameState = INITIAL_STATE, action: GameActions) => {
		switch (action.type) {
			case GameTypes.MOVE_PIECE:
				state.history.push(action.payload);
				return state;
			case GameTypes.RESET_GAME_HISTORY:
				state.history = [];
				return state;
			case GameTypes.SET_GAME_TYPE:
				state.gameType = action.payload;
				return state;
			case GameTypes.SET_ORIENTATION:
				state.orientation = action.payload;
				return state;
			case GameTypes.SET_FEN:
				state.fen = action.payload;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default gameReducer;
