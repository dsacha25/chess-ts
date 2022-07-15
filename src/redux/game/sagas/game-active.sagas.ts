import { DocumentReference, where } from 'firebase/firestore';
import { EventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	select,
	takeEvery,
	takeLeading,
} from 'typed-redux-saga/macro';
import { db, functions } from '../../../utils/classes/firestore/firestore-app';
import { listener } from '../../../utils/classes/sagas/saga-listener';
import { getPlayerOrientation } from '../../../utils/helpers/get-player-orientation/get-player-orientation';
import parseGameTime from '../../../utils/helpers/parsers/parse-game-time/parse-game-time';
import getReturn from '../../../utils/helpers/sagas/get-return-type';
import { ChessGameType } from '../../../utils/types/chess-game-type/chess-game-type';
import { ConfirmedMove } from '../../../utils/types/confirmed-move/confirmed-move';
import { selectUserUID } from '../../user/user.selector';
import { FetchGameByIdAction, SetActiveGameAction } from '../game.action-types';
import {
	fetchActiveGamesStart,
	fetchActiveGamesSuccess,
	gameError,
	makeConfirmedMoveSuccess,
	openActiveGameListener,
	setActiveGame,
	setCurrentGame,
	setFen,
	setGameHistory,
	setOrientation,
} from '../game.actions';
import {
	selectActiveGame,
	selectGameType,
	selectPendingMove,
} from '../game.selector';
import { GameTypes } from '../game.types';

// === GAME DRAW
export function* rejectDrawRequestAsync() {
	try {
		const game = yield* select(selectActiveGame);
		if (!game) return;

		yield* call(functions.callFirebaseFunction, 'rejectDrawRequest', {
			id: game.id,
		});
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onRejectDrawRequest() {
	yield* takeEvery(GameTypes.REJECT_DRAW_REQUEST, rejectDrawRequestAsync);
}

export function* acceptDrawRequestAsync() {
	try {
		const game = yield* select(selectActiveGame);
		if (!game) return;

		yield* call(functions.callFirebaseFunction, 'acceptDrawRequest', {
			id: game.id,
		});
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onAcceptDrawRequest() {
	yield* takeEvery(GameTypes.ACCEPT_DRAW_REQUEST, acceptDrawRequestAsync);
}

export function* requestDrawAsync() {
	try {
		const game = yield* select(selectActiveGame);
		if (!game) return;

		yield* call(functions.callFirebaseFunction, 'requestDraw', { id: game.id });
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onRequestDraw() {
	yield* takeEvery(GameTypes.REQUEST_DRAW, requestDrawAsync);
}

export function* callOpponentAutoResign() {
	try {
		const game = yield* select(selectActiveGame);
		if (!game) return;

		yield* call(functions.callFirebaseFunction, 'autoResignOpponent', {
			gameUID: game.id,
		});
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onAutoResignOpponent() {
	yield* takeEvery(GameTypes.AUTO_RESIGN_OPPONENT, callOpponentAutoResign);
}

export function* resignGameAsync() {
	try {
		const game = yield* select(selectActiveGame);
		if (!game) return;

		yield* call(functions.callFirebaseFunction, 'resignChessGame', {
			id: game.id,
		});
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onResignGame() {
	yield* takeEvery(GameTypes.RESIGN_GAME, resignGameAsync);
}

export function* makeConfirmedMoveAsync() {
	try {
		const game = yield* select(selectActiveGame);
		const pendingMove = yield* select(selectPendingMove);
		const uid = yield* select(selectUserUID);

		if (!game || !uid || !pendingMove) return;

		const { fen, move, winner, gameOver } = pendingMove;

		const confirmedMove: ConfirmedMove = {
			fen,
			id: game.id,
			move,
			winner,
			gameOver,
			gameTime: parseGameTime(uid, game),
		};

		yield console.log('CONFIRMED MOVE:', confirmedMove);
		yield* call(
			functions.callFirebaseFunction,
			'makeConfirmedMove',
			confirmedMove
		);
		yield* put(makeConfirmedMoveSuccess());
		yield* put(fetchActiveGamesStart());
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onMakeConfirmedMove() {
	yield* takeEvery(GameTypes.MAKE_CONFIRMED_MOVE_START, makeConfirmedMoveAsync);
}

export function* setActiveGameAsync({ payload: game }: SetActiveGameAction) {
	const uid = yield* select(selectUserUID);
	const gameType = yield* select(selectGameType);

	if (gameType !== 'online' || !uid) return;

	// yield console.log('GAME STATE MOVES: ', game.moves);

	yield* put(setFen(game.fen));
	yield* put(setOrientation(getPlayerOrientation(game.white.uid, uid)));
	yield* put(setGameHistory(game.moves));
	yield* put(openActiveGameListener());
}

export function* onSetActiveGame() {
	yield* takeEvery(GameTypes.SET_ACTIVE_GAME, setActiveGameAsync);
}

export function* getActiveGame(game: ChessGameType) {
	yield console.log('CHESS GAME LISTENER: ', game);
	const uid = yield* select(selectUserUID);
	const gameType = yield* select(selectGameType);

	if (gameType !== 'online' || !uid) return;

	yield* put(setFen(game.fen));
	yield* put(setOrientation(getPlayerOrientation(game.white.uid, uid)));
	yield* put(setGameHistory(game.moves));
	yield* put(setCurrentGame(game));
}

export function* openActiveGameListenerAsync() {
	try {
		const game = yield* select(selectActiveGame);

		if (!game) return;

		const gameRef = yield* call<
			any[],
			getReturn<DocumentReference<ChessGameType>>
		>(db.getDocumentReference, `games/${game.id}`);

		const gameChannel = yield* call<
			any[],
			getReturn<EventChannel<ChessGameType>>
		>(listener.generateDocumentListener, gameRef, true);

		yield console.log('LISTEN FOR: ', game.id);

		yield listener.initializeChannel(gameChannel, getActiveGame);
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onOpenActiveGameListener() {
	yield* takeEvery(
		GameTypes.OPEN_ACTIVE_GAME_LISTENER,
		openActiveGameListenerAsync
	);
}

export function* fetchGameByIdAsync({ payload: gameUID }: FetchGameByIdAction) {
	try {
		const uid = yield* select(selectUserUID);

		const game: ChessGameType = yield db.get<ChessGameType>('games', gameUID);

		yield console.log('GAME BY ID: ', game);

		if (!game || !uid) return;

		yield* put(setFen(game.fen));
		yield* put(setOrientation(getPlayerOrientation(game.white.uid, uid)));
		yield* put(setGameHistory(game.moves));
		yield* put(setActiveGame(game));

		// yield call(setActiveGameAsync, game);
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onFetchGameByID() {
	yield* takeEvery(GameTypes.FETCH_GAME_BY_ID, fetchGameByIdAsync);
}

export function* fetchActiveGamesAsync() {
	try {
		const uid = yield* select(selectUserUID);

		const games: ChessGameType[] = yield db.getAllWithID<ChessGameType[]>(
			'games',
			where('users', 'array-contains', uid),
			where('gameOver', '==', false)
		);

		// yield console.log('GAMES: ', games);
		yield* put(fetchActiveGamesSuccess(games));
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onFetchActiveGames() {
	yield* takeEvery(GameTypes.FETCH_ACTIVE_GAMES_START, fetchActiveGamesAsync);
}

export function* gameActiveSagas() {
	yield* all([
		call(onFetchActiveGames),
		call(onSetActiveGame),
		call(onMakeConfirmedMove),
		call(onOpenActiveGameListener),
		call(onResignGame),
		call(onAutoResignOpponent),
		call(onRequestDraw),
		call(onAcceptDrawRequest),
		call(onRejectDrawRequest),
		call(onFetchGameByID),
	]);
}
