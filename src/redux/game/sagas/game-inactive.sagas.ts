import { orderBy, where } from 'firebase/firestore';
import { all, call, put, select, takeEvery } from 'typed-redux-saga/macro';
import { db } from '../../../utils/classes/firestore/firestore-app';
import { ChessGameType } from '../../../utils/types/chess-game-type/chess-game-type';
import { selectUserUID } from '../../user/user.selector';
import { SetInactiveGameByIDStartAction } from '../game.action-types';
import {
	fetchInactiveGamesSuccess,
	gameError,
	setActiveGame,
} from '../game.actions';
import { GameTypes } from '../game.types';

export function* setInactiveGameByIDAsync({
	payload: gameUID,
}: SetInactiveGameByIDStartAction): Generator<any, void, any> {
	try {
		const game: ChessGameType | undefined = yield db.get<ChessGameType>(
			'games',
			gameUID
		);
		if (!game) return;

		yield console.log('GAME FOUND: ', game);

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

		const inactiveGames: ChessGameType[] = yield db.getAllWithID<
			ChessGameType[]
		>(
			'games',
			where('users', 'array-contains', uid),
			where('gameOver', '==', true),
			orderBy('createdAt', 'desc')
		);

		console.log('Inactive Games: ', inactiveGames);

		yield* put(fetchInactiveGamesSuccess(inactiveGames));
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onFetchInstactiveGames() {
	yield* takeEvery(
		GameTypes.FETCH_INACTIVE_GAMES_START,
		fetchInactiveGamesAsync
	);
}

export function* gamesInactiveSagas() {
	yield* all([call(onFetchInstactiveGames), call(onSetInactiveGameByID)]);
}
