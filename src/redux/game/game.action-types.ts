import { Move } from 'chess.js';
import { ChessGameType } from '../../utils/types/chess-game-type/chess-game-type';
import { ChessMove } from '../../utils/types/chess-move/chess-move';
import GameType from '../../utils/types/game-type/game-type';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';
import Orientation from '../../utils/types/orientation/orientation';
import { PendingRequest } from '../../utils/types/pending-request/pending-request';
import { GameTypes } from './game.types';

// ==== GAME STATE
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

export interface SetGameHistoryAction {
	type: GameTypes.SET_GAME_HISTORY;
	payload: Move[];
}

// ==== CHALLENGES
export interface SendGameChallengeAction {
	type: GameTypes.SEND_GAME_CHALLENGE;
	payload: string;
}

export interface AcceptGameChallengeAction {
	type: GameTypes.ACCEPT_GAME_CHALLENGE;
	payload: NotifSender;
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

// ==== PENDING CHALLENGES
export interface FetchPendingChallengesStartAction {
	type: GameTypes.FETCH_PENDING_CHALLENGES_START;
}

export interface FetchPendingChallengesSuccessAction {
	type: GameTypes.FETCH_PENDING_CHALLENGES_SUCCESS;
	payload: PendingRequest[];
}

// ==== ALL ACTIVE GAMES
export interface FetchActiveGamesStartAction {
	type: GameTypes.FETCH_ACTIVE_GAMES_START;
}

export interface FetchActiveGamesSuccessAction {
	type: GameTypes.FETCH_ACTIVE_GAMES_SUCCESS;
	payload: ChessGameType[];
}

// ==== ACTIVE GAME
export interface SetActiveGameAction {
	type: GameTypes.SET_ACTIVE_GAME;
	payload: ChessGameType;
}

export interface ClearActiveGameAction {
	type: GameTypes.CLEAR_ACTIVE_GAME;
}

// ==== MOVES
export interface MakePendingMoveAction {
	type: GameTypes.MAKE_PENDING_MOVE;
	payload: ChessMove;
}

export interface MakeConfirmedMoveStartAction {
	type: GameTypes.MAKE_CONFIRMED_MOVE_START;
}

export interface MakeConfirmedMoveSuccessAction {
	type: GameTypes.MAKE_CONFIRMED_MOVE_SUCCESS;
}

export interface RejectPendngMoveAction {
	type: GameTypes.REJECT_PENDING_MOVE;
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
	| SetGameHistoryAction
	| SendGameChallengeAction
	| AcceptGameChallengeAction
	| RejectGameChallengeAction
	| FetchGameChallengesStart
	| FetchGameChallengesSuccess
	| FetchPendingChallengesStartAction
	| FetchPendingChallengesSuccessAction
	| FetchActiveGamesStartAction
	| FetchActiveGamesSuccessAction
	| SetActiveGameAction
	| ClearActiveGameAction
	| MakePendingMoveAction
	| MakeConfirmedMoveStartAction
	| MakeConfirmedMoveSuccessAction
	| RejectPendngMoveAction
	| GameErrorAction;

export default GameActions;
