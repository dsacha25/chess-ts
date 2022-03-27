import { Move } from 'chess.js';
import GameType from '../../utils/types/game-type/game-type';
import Orientation from '../../utils/types/orientation/orientation';
import GameActions from './game.action-types';
import { GameTypes } from './game.types';
import { produce } from 'immer';
import { chunk, concat, map } from 'lodash';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';
import { ChessGameType } from '../../utils/types/chess-game-type/chess-game-type';

export interface GameState {
	fen: string;
	history: Move[];
	gameType: GameType;
	orientation: Orientation;
	challengeRequests: NotifSender[];
	games: ChessGameType[];
	error: string;
}

const INITIAL_STATE: GameState = {
	fen: 'start',
	history: [],
	gameType: 'solo',
	orientation: 'white',
	challengeRequests: [],
	games: [],
	error: '',
};

const gameReducer = produce(
	(state: GameState = INITIAL_STATE, action: GameActions) => {
		switch (action.type) {
			case GameTypes.MOVE_PIECE:
				state.history.push(action.payload);
				state.error = '';
				return state;
			case GameTypes.RESET_GAME_HISTORY:
				state.history = [];
				state.error = '';
				return state;
			case GameTypes.SET_GAME_TYPE:
				state.gameType = action.payload;
				state.error = '';
				return state;
			case GameTypes.SET_ORIENTATION:
				state.orientation = action.payload;
				state.error = '';
				return state;
			case GameTypes.SET_FEN:
				state.fen = action.payload;
				state.error = '';
				return state;
			case GameTypes.ACCEPT_GAME_CHALLENGE:
			case GameTypes.REJECT_GAME_CHALLENGE:
				state.challengeRequests = state.challengeRequests.filter(
					(sender) => sender.uid !== action.payload
				);
				state.error = '';
				return state;
			case GameTypes.FETCH_GAME_CHALLENGES_SUCCESS:
				state.challengeRequests = action.payload;
				state.error = '';
				return state;

			case GameTypes.FETCH_ACTIVE_GAMES_SUCCESS:
				state.games = action.payload;
				return state;
			case GameTypes.GAME_ERROR:
				state.error = action.payload;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default gameReducer;
