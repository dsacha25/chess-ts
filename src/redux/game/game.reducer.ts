import { Move } from 'chess.js';
import GameType from '../../utils/types/game-type/game-type';
import Orientation from '../../utils/types/orientation/orientation';
import GameActions from './game.action-types';
import { GameTypes } from './game.types';
import { produce } from 'immer';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';
import { ChessGameType } from '../../utils/types/chess-game-type/chess-game-type';
import { PendingRequest } from '../../utils/types/pending-request/pending-request';
import { ChessMove } from '../../utils/types/chess-move/chess-move';
import ChessGame from '../../utils/classes/chess-game/chess-game';
import { initial } from 'lodash';

export interface GameState {
	game: ChessGame | null;
	fen: string;
	history: Move[];
	gameType: GameType;
	orientation: Orientation;
	challengeRequests: NotifSender[];
	pendingChallenges: PendingRequest[];
	games: ChessGameType[];
	activeGame: ChessGameType | null;
	error: string;
	pendingMove: ChessMove | null;
}

const INITIAL_STATE: GameState = {
	game: null,
	fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
	history: [],
	gameType: 'solo',
	orientation: 'white',
	challengeRequests: [],
	pendingChallenges: [],
	games: [],
	activeGame: null,
	pendingMove: null,
	error: '',
};

const gameReducer = produce(
	(state: GameState = INITIAL_STATE, action: GameActions) => {
		switch (action.type) {
			case GameTypes.SET_GAME_INSTANCE:
				state.game = action.payload;
				state.error = '';
				return state;
			case GameTypes.CLEAR_GAME_INSTANCE:
				state.game = null;
				state.error = '';
				return state;
			case GameTypes.MOVE_PIECE:
				state.history.push(action.payload);
				state.error = '';
				return state;
			case GameTypes.SET_GAME_HISTORY:
				state.history = action.payload;
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
			case GameTypes.FETCH_PENDING_CHALLENGES_SUCCESS:
				state.pendingChallenges = action.payload;
				state.error = '';
				return state;
			case GameTypes.FETCH_ACTIVE_GAMES_SUCCESS:
				state.games = action.payload;
				state.error = '';
				return state;
			case GameTypes.SET_ACTIVE_GAME:
				state.activeGame = action.payload;
				state.error = '';
				return state;
			case GameTypes.CLEAR_ACTIVE_GAME:
				state.activeGame = null;
				state.error = '';
				return state;
			case GameTypes.MAKE_PENDING_MOVE:
				state.pendingMove = action.payload;
				return state;
			case GameTypes.REJECT_PENDING_MOVE:
				const chessGame = state.game;
				if (chessGame && chessGame.game) {
					state.game = chessGame.undoMove();
					if (state.history.length === 0) {
						state.fen = 'start';
					} else {
						state.fen = chessGame.game.fen();
					}
				}
				state.pendingMove = null;
				state.error = '';
				return state;
			case GameTypes.MAKE_CONFIRMED_MOVE_SUCCESS:
				state.pendingMove = null;
				state.error = '';
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
