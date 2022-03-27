import { where } from 'firebase/firestore';
import {
	all,
	call,
	put,
	select,
	SelectEffect,
	takeEvery,
} from 'redux-saga/effects';
import { db } from '../../../utils/classes/firestore/firestore-app';
import getErrorMessage from '../../../utils/helpers/errors/get-error-message';
import { ChessGameType } from '../../../utils/types/chess-game-type/chess-game-type';
import { selectUserUID } from '../../user/user.selector';
import { fetchActiveGamesSuccess, gameError } from '../game.actions';
import { GameTypes } from '../game.types';

export function* fetchActiveGamesAsync(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);
		yield console.log('UID GAME: ', uid);

		const games: ChessGameType[] = yield db.getAll<ChessGameType[]>(
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
	yield all([call(onFetchActiveGames)]);
}
