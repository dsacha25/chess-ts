import { Move } from 'chess.js';
import ChessGame from '../../utils/classes/chess-game/chess-game';
import { ChatMessage } from '../../utils/types/chat-message/chat-message';
import { ChatUsers } from '../../utils/types/chat-users/chat-users';
import { ChessGameType } from '../../utils/types/chess-game-type/chess-game-type';
import { ChessMove } from '../../utils/types/chess-move/chess-move';
import GameType from '../../utils/types/game-type/game-type';
import { HistoryMove } from '../../utils/types/history-move/history-move';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';
import Orientation from '../../utils/types/orientation/orientation';
import { PendingRequest } from '../../utils/types/pending-request/pending-request';
import { GameTypes } from './game.types';

// ==== GAME STATE
export interface MovePieceAction {
	type: GameTypes.MOVE_PIECE;
	payload: HistoryMove;
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
	payload: HistoryMove[];
}

// ==== CHALLENGES
export interface SendGameChallengeAction {
	type: GameTypes.SEND_GAME_CHALLENGE;
	payload: string;
}

export interface AcceptGameChallengeStartAction {
	type: GameTypes.ACCEPT_GAME_CHALLENGE_START;
	payload: NotifSender;
}

export interface GameChallengeResponseSuccessAction {
	type: GameTypes.GAME_CHALLENGE_RESPONSE_SUCCESS;
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

export interface OpenActiveGameListenerAction {
	type: GameTypes.OPEN_ACTIVE_GAME_LISTENER;
}

// ==== INACTIVE GAMES
export interface FetchInactiveGamesStartAction {
	type: GameTypes.FETCH_INACTIVE_GAMES_START;
}

export interface FetchInactiveGamesSuccessAction {
	type: GameTypes.FETCH_INACTIVE_GAMES_SUCCESS;
	payload: ChessGameType[];
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

// ==== GAME INSTANCE
export interface ClearGameInstanceAction {
	type: GameTypes.CLEAR_GAME_INSTANCE;
}

// ==== CHAT
export interface SendChatMessageStartAction {
	type: GameTypes.SEND_MESSAGE_START;
	payload: string;
}

export interface SendChatMessageSuccessAction {
	type: GameTypes.SEND_MESSAGE_SUCCESS;
	payload: ChatMessage;
}

export interface FetchChatStartAction {
	type: GameTypes.OPEN_CHAT_LISTENER_START;
}

export interface FetchChatSuccessAction {
	type: GameTypes.OPEN_CHAT_LISTENER_SUCCESS;
	payload: ChatMessage[];
}

export interface SetChatUsersAction {
	type: GameTypes.SET_CHAT_USERS;
	payload: ChatUsers;
}

export interface SetChatUnreadStateAction {
	type: GameTypes.SET_CHAT_UNREAD_STATE;
	payload: boolean;
}

export interface ReadChatMessaageAction {
	type: GameTypes.READ_CHAT_MESSAGE;
}

export interface ChatErrorAction {
	type: GameTypes.CHAT_FAILURE;
	payload: string;
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
	| AcceptGameChallengeStartAction
	| GameChallengeResponseSuccessAction
	| RejectGameChallengeAction
	| FetchGameChallengesStart
	| FetchGameChallengesSuccess
	| FetchPendingChallengesStartAction
	| FetchPendingChallengesSuccessAction
	| FetchActiveGamesStartAction
	| FetchActiveGamesSuccessAction
	| FetchInactiveGamesStartAction
	| FetchInactiveGamesSuccessAction
	| SetActiveGameAction
	| ClearActiveGameAction
	| OpenActiveGameListenerAction
	| MakePendingMoveAction
	| MakeConfirmedMoveStartAction
	| MakeConfirmedMoveSuccessAction
	| RejectPendngMoveAction
	| ClearGameInstanceAction
	| SendChatMessageStartAction
	| SendChatMessageSuccessAction
	| FetchChatStartAction
	| FetchChatSuccessAction
	| SetChatUsersAction
	| SetChatUnreadStateAction
	| ReadChatMessaageAction
	| ChatErrorAction
	| GameErrorAction;

export default GameActions;
