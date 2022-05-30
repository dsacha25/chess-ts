import { where } from 'firebase/firestore';
import { EventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	select,
	SelectEffect,
	takeEvery,
} from 'redux-saga/effects';
import ChessGame from '../../../utils/classes/chess-game/chess-game';
import { db, functions } from '../../../utils/classes/firestore/firestore-app';
import { listener } from '../../../utils/classes/sagas/saga-listener';
import getErrorMessage from '../../../utils/helpers/errors/get-error-message';
import { getPlayerOrientation } from '../../../utils/helpers/get-player-orientation/get-player-orientation';
import getOrientation from '../../../utils/helpers/orientation/get-orientation';
import { ChessGameType } from '../../../utils/types/chess-game-type/chess-game-type';
import { ChessMove } from '../../../utils/types/chess-move/chess-move';
import { ConfirmedMove } from '../../../utils/types/confirmed-move/confirmed-move';
import { selectUserUID } from '../../user/user.selector';
import { SetActiveGameAction } from '../game.action-types';
import {
	fetchActiveGamesStart,
	fetchActiveGamesSuccess,
	gameError,
	makeConfirmedMoveSuccess,
	openActiveGameListener,
	setActiveGame,
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
export function* rejectDrawRequestAsync(): Generator | SelectEffect {
	try {
		const game: ChessGameType = yield select(selectActiveGame);

		yield functions.callFirebaseFunction('rejectDrawRequest', { id: game.id });
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onRejectDrawRequest() {
	yield takeEvery(GameTypes.REJECT_DRAW_REQUEST, rejectDrawRequestAsync);
}

export function* acceptDrawRequestAsync(): Generator | SelectEffect {
	try {
		const game: ChessGameType = yield select(selectActiveGame);

		yield functions.callFirebaseFunction('acceptDrawRequest', { id: game.id });
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onAcceptDrawRequest() {
	yield takeEvery(GameTypes.ACCEPT_DRAW_REQUEST, acceptDrawRequestAsync);
}

export function* requestDrawAsync(): Generator | SelectEffect {
	try {
		const game: ChessGameType = yield select(selectActiveGame);

		yield functions.callFirebaseFunction('requestDraw', { id: game.id });
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onRequestDraw() {
	yield takeEvery(GameTypes.REQUEST_DRAW, requestDrawAsync);
}

export function* resignGameAsync(): Generator | SelectEffect {
	try {
		const game: ChessGameType = yield select(selectActiveGame);

		yield functions.callFirebaseFunction('resignChessGame', { id: game.id });
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onResignGame() {
	yield takeEvery(GameTypes.RESIGN_GAME, resignGameAsync);
}

export function* makeConfirmedMoveAsync(): Generator | SelectEffect {
	try {
		const game: ChessGameType | null = yield select(selectActiveGame);
		const { fen, move, winner, gameOver }: ChessMove = yield select(
			selectPendingMove
		);

		yield console.log('ACTIVE GAME: ', game);
		yield console.log('PENDING MOVE GO?: ', gameOver);

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
		yield put(makeConfirmedMoveSuccess());
		yield put(fetchActiveGamesStart());
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onMakeConfirmedMove() {
	yield takeEvery(GameTypes.MAKE_CONFIRMED_MOVE_START, makeConfirmedMoveAsync);
}

export function* setActiveGameAsync({
	payload: game,
}: SetActiveGameAction): Generator | SelectEffect {
	const uid = yield select(selectUserUID);
	const gameType = yield select(selectGameType);

	if (gameType !== 'online') return;

	yield console.log('GAME STATE MOVES: ', game.moves);

	yield put(setFen(game.fen));
	yield put(setOrientation(getPlayerOrientation(game.white.uid, uid)));
	yield put(setGameHistory(game.moves));

	yield put(openActiveGameListener());
}

export function* onSetActiveGame() {
	yield takeEvery(GameTypes.SET_ACTIVE_GAME, setActiveGameAsync);
}

export function* getActiveGame(game: ChessGameType): Generator | SelectEffect {
	yield console.log('CHESS GAME LISTENER: ', game);
	const uid = yield select(selectUserUID);
	const gameType = yield select(selectGameType);

	if (gameType !== 'online') return;

	yield put(setFen(game.fen));
	yield put(setOrientation(getPlayerOrientation(game.white.uid, uid)));
	yield put(setGameHistory(game.moves));
	// if (game.id) {
	// 	yield put(setActiveGame(game));
	// }
}

export function* openActiveGameListenerAsync(): Generator | SelectEffect {
	try {
		const game: ChessGameType | null = yield select(selectActiveGame);

		if (!game) return;

		const gameRef = yield db.getDocumentReference(`games/${game.id}`);
		const gameChannel: EventChannel<ChessGameType> =
			yield listener.generateDocumentListener<ChessGameType>(gameRef);

		yield listener.initializeChannel<ChessGameType>(gameChannel, getActiveGame);
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onOpenActiveGameListener() {
	yield takeEvery(
		GameTypes.OPEN_ACTIVE_GAME_LISTENER,
		openActiveGameListenerAsync
	);
}

export function* fetchActiveGamesAsync(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const games: ChessGameType[] = yield db.getAllWithID<ChessGameType[]>(
			'games',
			where('users', 'array-contains', uid),
			where('gameOver', '==', false)
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
		call(onOpenActiveGameListener),
		call(onResignGame),
		call(onRequestDraw),
		call(onAcceptDrawRequest),
		call(onRejectDrawRequest),
	]);
}
