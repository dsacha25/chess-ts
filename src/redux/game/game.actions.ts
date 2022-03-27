import { Move } from 'chess.js';
import GameType from '../../utils/types/game-type/game-type';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';
import Orientation from '../../utils/types/orientation/orientation';
import { PendingRequest } from '../../utils/types/pending-request/pending-request';
import {
	AcceptGameChallengeAction,
	FetchActiveGamesStartAction,
	FetchActiveGamesSuccessAction,
	FetchGameChallengesStart,
	FetchGameChallengesSuccess,
	FetchPendingChallengesStartAction,
	FetchPendingChallengesSuccessAction,
	GameErrorAction,
	MovePieceAction,
	RejectGameChallengeAction,
	ResetGameHistoryAction,
	SendGameChallengeAction,
	SetFenAction,
	SetGameTypeAction,
	SetOrientationAction,
} from './game.action-types';
import { GameTypes } from './game.types';

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

export const movePiece = (move: Move): MovePieceAction => ({
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

// GAME CHALLENGES
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

// ACTIVE GAMES
export const fetchActiveGamesStart = (): FetchActiveGamesStartAction => ({
	type: GameTypes.FETCH_ACTIVE_GAMES_START,
});

export const fetchActiveGamesSuccess = (
	games: any[]
): FetchActiveGamesSuccessAction => ({
	type: GameTypes.FETCH_ACTIVE_GAMES_SUCCESS,
	payload: games,
});

// GAME ERROR
export const gameError = (error: string): GameErrorAction => ({
	type: GameTypes.GAME_ERROR,
	payload: error,
});
