import { AiLevel } from 'js-chess-engine';
import { ChatMessage } from '../../utils/types/chess/chat-message/chat-message';
import { ChatUsers } from '../../utils/types/users/chat-users/chat-users';
import { ChessGameAiType } from '../../utils/types/chess/chess-game-ai-type/chess-game-ai-type';
import { ChessGameType } from '../../utils/types/chess/chess-game-type/chess-game-type';
import { ChessMove } from '../../utils/types/chess/chess-move/chess-move';
import GameModeTypes from '../../utils/types/chess/game-mode-type/game-mode-type';
import GamePlayType from '../../utils/types/chess/game-play-type/game-play-type';
import GameTime from '../../utils/types/chess/game-time/game-time';
import { HistoryMove } from '../../utils/types/chess/history-move/history-move';
import { NotifSender } from '../../utils/types/notifications/notif-sender/notif-sender';
import Orientation from '../../utils/types/chess/orientation/orientation';
import { PendingRequest } from '../../utils/types/requests/pending-request/pending-request';
import { PromotionPieces } from '../../utils/types/chess/promotion-pieces/promotion-pieces';
import { GameTypes } from './game.types';

// ==== GAME STATE
export interface SetAiLevelAction {
	type: GameTypes.SET_AI_LEVEL;
	payload: AiLevel | null;
}

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
	payload: GamePlayType;
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
	payload: { enemyUID: string; gameMode: GameModeTypes };
}

export interface AcceptGameChallengeStartAction {
	type: GameTypes.ACCEPT_GAME_CHALLENGE_START;
	payload: { enemy: NotifSender; callback: (gameUID: string) => void };
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

export interface SetCurrentGameAction {
	type: GameTypes.SET_CURRENT_GAME;
	payload: ChessGameType;
}

export interface SetActiveGameAiAction {
	type: GameTypes.SET_ACTIVE_GAME_AI;
	payload: ChessGameAiType;
}

export interface ClearActiveGameAction {
	type: GameTypes.CLEAR_ACTIVE_GAME;
}

export interface OpenActiveGameListenerAction {
	type: GameTypes.OPEN_ACTIVE_GAME_LISTENER;
}

export interface CloseActiveGameListenerAction {
	type: GameTypes.CLOSE_ACTIVE_GAME_LISTENER;
}

export interface SetActiveGameTimeAction {
	type: GameTypes.SET_ACTIVE_GAME_TIME;
	payload: { gameTime: GameTime; side: Orientation };
}

export interface FetchGameByIdAction {
	type: GameTypes.FETCH_GAME_BY_ID;
	payload: string;
}

// ==== INACTIVE GAMES
export interface FetchInactiveGamesStartAction {
	type: GameTypes.FETCH_INACTIVE_GAMES_START;
}

export interface FetchInactiveGamesSuccessAction {
	type: GameTypes.FETCH_INACTIVE_GAMES_SUCCESS;
	payload: ChessGameType[];
}

export interface SetInactiveGameByIDStartAction {
	type: GameTypes.SET_INACTIVE_GAME_BY_ID_START;
	payload: string;
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

export interface GetDefaultPositionAction {
	type: GameTypes.GET_DEFAULT_POSITION;
}

export interface GetPreviousMoveAction {
	type: GameTypes.GET_PREVIOUS_MOVE;
}

export interface GetNextMoveAction {
	type: GameTypes.GET_NEXT_MOVE;
}

export interface GetLatestMoveAction {
	type: GameTypes.GET_LATEST_MOVE;
}

// ==== PIECE PROMOTION
export interface SetPromotionPieceTypeAction {
	type: GameTypes.SET_PROMOTION_PIECE_TYPE;
	payload: PromotionPieces;
}

export interface ClearPromotionPieceTypeAction {
	type: GameTypes.CLEAR_PROMOTION_PIECE_TYPE;
}

// ==== RESIGN & DRAW
export interface ResignGameAction {
	type: GameTypes.RESIGN_GAME;
}

export interface AutoResignOpponentAction {
	type: GameTypes.AUTO_RESIGN_OPPONENT;
}

export interface RequestDrawAction {
	type: GameTypes.REQUEST_DRAW;
}

export interface AcceptDrawRequestAction {
	type: GameTypes.ACCEPT_DRAW_REQUEST;
}

export interface RejectDrawRequestAction {
	type: GameTypes.REJECT_DRAW_REQUEST;
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
	| SetAiLevelAction
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
	| ResignGameAction
	| AutoResignOpponentAction
	| RequestDrawAction
	| AcceptDrawRequestAction
	| RejectDrawRequestAction
	| FetchGameChallengesStart
	| FetchGameChallengesSuccess
	| FetchPendingChallengesStartAction
	| FetchPendingChallengesSuccessAction
	| FetchActiveGamesStartAction
	| FetchActiveGamesSuccessAction
	| FetchInactiveGamesStartAction
	| FetchInactiveGamesSuccessAction
	| FetchGameByIdAction
	| SetActiveGameAction
	| SetCurrentGameAction
	| SetActiveGameAiAction
	| SetInactiveGameByIDStartAction
	| ClearActiveGameAction
	| OpenActiveGameListenerAction
	| CloseActiveGameListenerAction
	| SetActiveGameTimeAction
	| MakePendingMoveAction
	| MakeConfirmedMoveStartAction
	| MakeConfirmedMoveSuccessAction
	| RejectPendngMoveAction
	| GetDefaultPositionAction
	| GetPreviousMoveAction
	| GetNextMoveAction
	| GetLatestMoveAction
	| SetPromotionPieceTypeAction
	| ClearPromotionPieceTypeAction
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
