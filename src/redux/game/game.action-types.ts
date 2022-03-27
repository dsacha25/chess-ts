import { Move } from 'chess.js';
import { ChessGameType } from '../../utils/types/chess-game-type/chess-game-type';
import GameType from '../../utils/types/game-type/game-type';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';
import Orientation from '../../utils/types/orientation/orientation';
import { GameTypes } from './game.types';

export interface MovePieceAction {
	type: GameTypes.MOVE_PIECE;
	payload: Move;
}

export interface ResetGameHistoryAction {
	type: GameTypes.RESET_GAME_HISTORY;
}

export interface SetOrientationAction {
	type: GameTypes.SET_ORIENTATION;
	payload: Orientation;
}

export interface SetGameTypeAction {
	type: GameTypes.SET_GAME_TYPE;
	payload: GameType;
}

export interface SetFenAction {
	type: GameTypes.SET_FEN;
	payload: string;
}

// CHALLENGES
export interface SendGameChallengeAction {
	type: GameTypes.SEND_GAME_CHALLENGE;
	payload: string;
}

export interface AcceptGameChallengeAction {
	type: GameTypes.ACCEPT_GAME_CHALLENGE;
	payload: string;
}

export interface RejectGameChallengeAction {
	type: GameTypes.REJECT_GAME_CHALLENGE;
	payload: string;
}

export interface FetchGameChallengesStart {
	type: GameTypes.FETCH_GAME_CHALLENGES_START;
}

export interface FetchGameChallengesSuccess {
	type: GameTypes.FETCH_GAME_CHALLENGES_SUCCESS;
	payload: NotifSender[];
}

// ==== ACTIVE GAMES
export interface FetchActiveGamesStartAction {
	type: GameTypes.FETCH_ACTIVE_GAMES_START;
}

export interface FetchActiveGamesSuccessAction {
	type: GameTypes.FETCH_ACTIVE_GAMES_SUCCESS;
	payload: ChessGameType[];
}

// ==== GAME ERROR
export interface GameErrorAction {
	type: GameTypes.GAME_ERROR;
	payload: string;
}

type GameActions =
	| MovePieceAction
	| ResetGameHistoryAction
	| SetOrientationAction
	| SetGameTypeAction
	| SetFenAction
	| SendGameChallengeAction
	| AcceptGameChallengeAction
	| RejectGameChallengeAction
	| FetchGameChallengesStart
	| FetchGameChallengesSuccess
	| FetchActiveGamesStartAction
	| FetchActiveGamesSuccessAction
	| GameErrorAction;

export default GameActions;
