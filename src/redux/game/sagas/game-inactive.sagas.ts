import { orderBy, where } from 'firebase/firestore';
import { all, call, put, select, takeEvery } from 'typed-redux-saga/macro';
import { db } from '../../../utils/classes/firestore/firestore-app';
import { getPromiseReturn } from '../../../utils/helpers/sagas/get-return-type';
import { ChessGameType } from '../../../utils/types/chess/chess-game-type/chess-game-type';
import { GameSummary } from '../../../utils/types/chess/game-summary/game-summary';
import { selectUserUID } from '../../user/user.selector';
import { SetInactiveGameByIDStartAction } from '../game.action-types';
import {
	fetchInactiveGamesSuccess,
	fetchInactiveGameSummariesSuccess,
	gameError,
	setActiveGame,
} from '../game.actions';
import { GameTypes } from '../game.types';

export function* setInactiveGameByIDAsync({
	payload: gameUID,
}: SetInactiveGameByIDStartAction): Generator<any, void, any> {
	try {
		const game = yield* call<any[], getPromiseReturn<ChessGameType>>(
			db.get,
			'games',
			gameUID
		);
		if (!game) return;

		yield* put(setActiveGame(game));
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onSetInactiveGameByID() {
	yield* takeEvery(
		GameTypes.SET_INACTIVE_GAME_BY_ID_START,
		setInactiveGameByIDAsync
	);
}

export function* fetchInactiveGamesAsync() {
	try {
		const uid = yield* select(selectUserUID);

		const inactiveGames = yield* call<
			any[],
			(...args: any) => Promise<ChessGameType[]>
		>(
			db.getAllWithID,
			'games',
			where('users', 'array-contains', uid),
			where('gameOver.isGameOver', '==', true),
			orderBy('createdAt', 'desc')
		);

		console.log('Inactive Games: ', inactiveGames);

		yield* put(fetchInactiveGamesSuccess(inactiveGames));
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onFetchInactiveGames() {
	yield* takeEvery(
		GameTypes.FETCH_INACTIVE_GAMES_START,
		fetchInactiveGamesAsync
	);
}

export function* fetchGameSummaries() {
	try {
		const uid = yield* select(selectUserUID);

		const gameSummaries = yield* call<
			any[],
			(...args: any) => Promise<GameSummary[]>
		>(db.getAllWithID, `users/${uid}/games`);

		yield* put(fetchInactiveGameSummariesSuccess(gameSummaries));
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onFetchInactiveGameSummaries() {
	yield* takeEvery(GameTypes.FETCH_INACTIVE_GAMES_START, fetchGameSummaries);
}

export function* gamesInactiveSagas() {
	yield* all([
		call(onFetchInactiveGames),
		call(onSetInactiveGameByID),
		call(onFetchInactiveGameSummaries),
	]);
}
