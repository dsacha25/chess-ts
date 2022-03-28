import { where } from 'firebase/firestore';
import {
	all,
	call,
	put,
	select,
	SelectEffect,
	takeEvery,
} from 'redux-saga/effects';
import { db, functions } from '../../../utils/classes/firestore/firestore-app';
import getErrorMessage from '../../../utils/helpers/errors/get-error-message';
import { getPlayerOrientation } from '../../../utils/helpers/get-player-orientation/get-player-orientation';
import getOrientation from '../../../utils/helpers/orientation/get-orientation';
import { ChessGameType } from '../../../utils/types/chess-game-type/chess-game-type';
import { ChessMove } from '../../../utils/types/chess-move/chess-move';
import { ConfirmedMove } from '../../../utils/types/confirmed-move/confirmed-move';
import { selectUserUID } from '../../user/user.selector';
import { SetActiveGameAction } from '../game.action-types';
import {
	fetchActiveGamesSuccess,
	gameError,
	setFen,
	setGameHistory,
	setOrientation,
} from '../game.actions';
import { selectActiveGame, selectPendingMove } from '../game.selector';
import { GameTypes } from '../game.types';

export function* makeConfirmedMoveAsync(): Generator | SelectEffect {
	try {
		const game: ChessGameType | null = yield select(selectActiveGame);
		const { fen, move, winner, gameOver }: ChessMove = yield select(
			selectPendingMove
		);

		if (!game) return;

		const confirmedMove: ConfirmedMove = {
			fen,
			id: game.id,
			move,
			winner,
			gameOver,
		};

		yield console.log('CONFIRMED MOVE:', confirmedMove);
		yield functions.callFirebaseFunction('makeConfirmedMove', confirmedMove);
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onMakeConfirmedMove() {
	yield takeEvery(GameTypes.MAKE_CONFIRMED_MOVE_START, makeConfirmedMoveAsync);
}

export function* setActiveGame({
	payload: game,
}: SetActiveGameAction): Generator | SelectEffect {
	const uid = yield select(selectUserUID);

	yield put(setFen(game.fen));
	yield put(setOrientation(getPlayerOrientation(game.white.uid, uid)));
	yield put(setGameHistory(game.moves));
}

export function* onSetActiveGame() {
	yield takeEvery(GameTypes.SET_ACTIVE_GAME, setActiveGame);
}

export function* fetchActiveGamesAsync(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const games: ChessGameType[] = yield db.getAllWithID<ChessGameType[]>(
			'games',
			where('users', 'array-contains', uid)
		);

		yield console.log('GAMES: ', games);
		yield put(fetchActiveGamesSuccess(games));
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onFetchActiveGames() {
	yield takeEvery(GameTypes.FETCH_ACTIVE_GAMES_START, fetchActiveGamesAsync);
}

export function* gameActiveSagas() {
	yield all([
		call(onFetchActiveGames),
		call(onSetActiveGame),
		call(onMakeConfirmedMove),
	]);
}
