import { Move } from 'chess.js';
import ChessGame from '../../utils/classes/chess-game/chess-game';
import { ChessGameType } from '../../utils/types/chess-game-type/chess-game-type';
import { ChessMove } from '../../utils/types/chess-move/chess-move';
import GameType from '../../utils/types/game-type/game-type';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';
import Orientation from '../../utils/types/orientation/orientation';
import { PendingRequest } from '../../utils/types/pending-request/pending-request';
import {
	AcceptGameChallengeAction,
	ClearActiveGameAction,
	ClearGameInstanceAction,
	FetchActiveGamesStartAction,
	FetchActiveGamesSuccessAction,
	FetchGameChallengesStart,
	FetchGameChallengesSuccess,
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
	SendGameChallengeAction,
	SetActiveGameAction,
	SetFenAction,
	SetGameHistoryAction,
	SetGameInstanceAction,
	SetGameTypeAction,
	SetOrientationAction,
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

export const movePiece = (move: string): MovePieceAction => ({
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

export const setGameHistory = (history: string[]): SetGameHistoryAction => ({
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

export const acceptGameChallenge = (
	enemy: NotifSender
): AcceptGameChallengeAction => ({
	type: GameTypes.ACCEPT_GAME_CHALLENGE,
	payload: enemy,
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

// ==== GAME INSTANCE
export const setGameInstance = (game: ChessGame): SetGameInstanceAction => ({
	type: GameTypes.SET_GAME_INSTANCE,
	payload: game,
});

export const clearGameInstance = (): ClearGameInstanceAction => ({
	type: GameTypes.CLEAR_GAME_INSTANCE,
});

// GAME ERROR
export const gameError = (error: string): GameErrorAction => ({
	type: GameTypes.GAME_ERROR,
	payload: error,
});
