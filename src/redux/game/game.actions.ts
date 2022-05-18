import { Game } from 'js-chess-engine';
import { ChatMessage } from '../../utils/types/chat-message/chat-message';
import { ChatUsers } from '../../utils/types/chat-users/chat-users';
import { ChessGameType } from '../../utils/types/chess-game-type/chess-game-type';
import { ChessMove } from '../../utils/types/chess-move/chess-move';
import GameType from '../../utils/types/game-type/game-type';
import { HistoryMove } from '../../utils/types/history-move/history-move';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';
import Orientation from '../../utils/types/orientation/orientation';
import { PendingRequest } from '../../utils/types/pending-request/pending-request';
import {
	AcceptGameChallengeStartAction,
	GameChallengeResponseSuccessAction,
	ChatErrorAction,
	ClearActiveGameAction,
	ClearGameInstanceAction,
	FetchActiveGamesStartAction,
	FetchActiveGamesSuccessAction,
	FetchChatStartAction,
	FetchChatSuccessAction,
	FetchGameChallengesStart,
	FetchGameChallengesSuccess,
	FetchInactiveGamesStartAction,
	FetchInactiveGamesSuccessAction,
	FetchPendingChallengesStartAction,
	FetchPendingChallengesSuccessAction,
	GameErrorAction,
	MakeConfirmedMoveStartAction,
	MakeConfirmedMoveSuccessAction,
	MakePendingMoveAction,
	MovePieceAction,
	OpenActiveGameListenerAction,
	RejectGameChallengeAction,
	RejectPendngMoveAction,
	ResetGameHistoryAction,
	SendChatMessageStartAction,
	SendChatMessageSuccessAction,
	SendGameChallengeAction,
	SetActiveGameAction,
	SetFenAction,
	SetGameHistoryAction,
	SetGameTypeAction,
	SetOrientationAction,
	SetChatUsersAction,
	SetChatUnreadStateAction,
	ReadChatMessaageAction,
	ResignGameAction,
	RequestDrawAction,
	AcceptDrawRequestAction,
	RejectDrawRequestAction,
} from './game.action-types';
import { GameTypes } from './game.types';

// ==== GAME STATE
export const setGameType = (gameType: GameType): SetGameTypeAction => ({
	type: GameTypes.SET_GAME_TYPE,
	payload: gameType,
});

export const setOrientation = (
	orientation: Orientation
): SetOrientationAction => ({
	type: GameTypes.SET_ORIENTATION,
	payload: orientation,
});

export const movePiece = (move: HistoryMove): MovePieceAction => ({
	type: GameTypes.MOVE_PIECE,
	payload: move,
});

export const resetGame = (): ResetGameHistoryAction => ({
	type: GameTypes.RESET_GAME_HISTORY,
});

export const setFen = (fen: string): SetFenAction => ({
	type: GameTypes.SET_FEN,
	payload: fen,
});

export const setGameHistory = (
	history: HistoryMove[]
): SetGameHistoryAction => ({
	type: GameTypes.SET_GAME_HISTORY,
	payload: history,
});

// ==== GAME CHALLENGES
export const sendGameChallenge = (
	enemyUID: string
): SendGameChallengeAction => ({
	type: GameTypes.SEND_GAME_CHALLENGE,
	payload: enemyUID,
});

export const acceptGameChallengeStart = (
	enemy: NotifSender
): AcceptGameChallengeStartAction => ({
	type: GameTypes.ACCEPT_GAME_CHALLENGE_START,
	payload: enemy,
});

export const gameChallengeResponseSuccess = (
	enemyUID: string
): GameChallengeResponseSuccessAction => ({
	type: GameTypes.GAME_CHALLENGE_RESPONSE_SUCCESS,
	payload: enemyUID,
});

export const rejectGameChallenge = (
	enemyUID: string
): RejectGameChallengeAction => ({
	type: GameTypes.REJECT_GAME_CHALLENGE,
	payload: enemyUID,
});

export const fetchGameChallengesStart = (): FetchGameChallengesStart => ({
	type: GameTypes.FETCH_GAME_CHALLENGES_START,
});

export const fetchGameChallengesSuccess = (
	senders: NotifSender[]
): FetchGameChallengesSuccess => ({
	type: GameTypes.FETCH_GAME_CHALLENGES_SUCCESS,
	payload: senders,
});

// ==== PENDING CHALLENGES
export const fetchPendingChallengesStart =
	(): FetchPendingChallengesStartAction => ({
		type: GameTypes.FETCH_PENDING_CHALLENGES_START,
	});

export const fetchPendingChallengesSuccess = (
	pendingChallenges: PendingRequest[]
): FetchPendingChallengesSuccessAction => ({
	type: GameTypes.FETCH_PENDING_CHALLENGES_SUCCESS,
	payload: pendingChallenges,
});

// ALL ACTIVE GAMES
export const fetchActiveGamesStart = (): FetchActiveGamesStartAction => ({
	type: GameTypes.FETCH_ACTIVE_GAMES_START,
});

export const fetchActiveGamesSuccess = (
	games: any[]
): FetchActiveGamesSuccessAction => ({
	type: GameTypes.FETCH_ACTIVE_GAMES_SUCCESS,
	payload: games,
});

// ==== ACTIVE GAMES
export const setActiveGame = (game: ChessGameType): SetActiveGameAction => ({
	type: GameTypes.SET_ACTIVE_GAME,
	payload: game,
});

export const clearActiveGame = (): ClearActiveGameAction => ({
	type: GameTypes.CLEAR_ACTIVE_GAME,
});

export const openActiveGameListener = (): OpenActiveGameListenerAction => ({
	type: GameTypes.OPEN_ACTIVE_GAME_LISTENER,
});

// ==== INACTIVE GAMES
export const fetchInactiveGamesStart = (): FetchInactiveGamesStartAction => ({
	type: GameTypes.FETCH_INACTIVE_GAMES_START,
});

export const fetchInactiveGamesSuccess = (
	inactiveGames: ChessGameType[]
): FetchInactiveGamesSuccessAction => ({
	type: GameTypes.FETCH_INACTIVE_GAMES_SUCCESS,
	payload: inactiveGames,
});

// MAKE MOVE
export const makePendingMove = (move: ChessMove): MakePendingMoveAction => ({
	type: GameTypes.MAKE_PENDING_MOVE,
	payload: move,
});

export const makeConfirmedMoveStart = (): MakeConfirmedMoveStartAction => ({
	type: GameTypes.MAKE_CONFIRMED_MOVE_START,
});

export const makeConfirmedMoveSuccess = (): MakeConfirmedMoveSuccessAction => ({
	type: GameTypes.MAKE_CONFIRMED_MOVE_SUCCESS,
});

export const rejectPendingMove = (): RejectPendngMoveAction => ({
	type: GameTypes.REJECT_PENDING_MOVE,
});

// ==== RESIGN & DRAW
export const resignGame = (): ResignGameAction => ({
	type: GameTypes.RESIGN_GAME,
});

export const requestDraw = (): RequestDrawAction => ({
	type: GameTypes.REQUEST_DRAW,
});

export const acceptDrawRequest = (): AcceptDrawRequestAction => ({
	type: GameTypes.ACCEPT_DRAW_REQUEST,
});

export const rejectDrawRequest = (): RejectDrawRequestAction => ({
	type: GameTypes.REJECT_DRAW_REQUEST,
});

// ==== GAME INSTANCE
export const clearGameInstance = (): ClearGameInstanceAction => ({
	type: GameTypes.CLEAR_GAME_INSTANCE,
});

// ==== CHAT
export const sendChatMessageStart = (
	message: string
): SendChatMessageStartAction => ({
	type: GameTypes.SEND_MESSAGE_START,
	payload: message,
});

export const sendChatMessageSuccess = (
	chatMessage: ChatMessage
): SendChatMessageSuccessAction => ({
	type: GameTypes.SEND_MESSAGE_SUCCESS,
	payload: chatMessage,
});

export const openChatListenerStart = (): FetchChatStartAction => ({
	type: GameTypes.OPEN_CHAT_LISTENER_START,
});

export const openChatListenerSuccess = (
	chatMessages: ChatMessage[]
): FetchChatSuccessAction => ({
	type: GameTypes.OPEN_CHAT_LISTENER_SUCCESS,
	payload: chatMessages,
});

export const setChatUsers = (chatUsers: ChatUsers): SetChatUsersAction => ({
	type: GameTypes.SET_CHAT_USERS,
	payload: chatUsers,
});

export const setChatUnreadState = (
	unread: boolean
): SetChatUnreadStateAction => ({
	type: GameTypes.SET_CHAT_UNREAD_STATE,
	payload: unread,
});

export const readChatMessage = (): ReadChatMessaageAction => ({
	type: GameTypes.READ_CHAT_MESSAGE,
});

export const chatError = (message: string): ChatErrorAction => ({
	type: GameTypes.CHAT_FAILURE,
	payload: message,
});

// GAME ERROR
export const gameError = (error: string): GameErrorAction => ({
	type: GameTypes.GAME_ERROR,
	payload: error,
});
