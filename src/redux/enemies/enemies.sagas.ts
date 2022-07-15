import { where } from 'firebase/firestore';
import { filter, flatMap } from 'lodash';
import { EventChannel } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'typed-redux-saga/macro';
import { db, functions } from '../../utils/classes/firestore/firestore-app';
import { listener } from '../../utils/classes/sagas/saga-listener';
import { ChessUser } from '../../utils/types/chess-user/chess-user';
import { Enemyship } from '../../utils/types/enemyship/enemyship';
import { selectChessUser, selectUserUID } from '../user/user.selector';
import {
	FetchEnemyInfoStartAction,
	SearchEnemiesStartAction,
	SendEnemyRequestAction,
} from './enemies.action-types';
import {
	enemyError,
	fetchEnemiesSuccess,
	fetchEnemyInfoSuccess,
	searchEnemiesSuccess,
} from './enemies.actions';
import { EnemyTypes } from './enemies.types';

export function* fetchEnemyInfo(enemy: ChessUser) {
	yield* put(fetchEnemyInfoSuccess(enemy));
}

export function* fetchEnemyInfoAsync({
	payload: enemyUID,
}: FetchEnemyInfoStartAction) {
	try {
		// const enemy: ChessUser = yield db.get<ChessUser>('users', enemyUID);

		const enemyRef = yield* call(db.getDocumentReference, `users/${enemyUID}`);

		const enemyChannel: EventChannel<ChessUser> =
			yield listener.generateDocumentListener(enemyRef);

		yield listener.initializeChannel<ChessUser>(enemyChannel, fetchEnemyInfo);
	} catch (err) {
		yield* put(enemyError((err as Error).message));
	}
}

export function* onFetchEnemyInfoStart() {
	yield* takeEvery(EnemyTypes.FETCH_ENEMY_INFO_START, fetchEnemyInfoAsync);
}

export function* fetchEnemiesAsync() {
	try {
		const uid = yield* select(selectUserUID);

		if (!uid) return;

		const enemyDocuments: Enemyship[] = yield call(
			db.getAll,
			'enmities',
			where('users', 'array-contains', uid)
		);

		const enemyships = flatMap(enemyDocuments, (enemy) =>
			filter(enemy.users, (userUID) => userUID !== uid)
		);

		let enemies: ChessUser[] = [];

		for (const enemyUID of enemyships) {
			const enemy: ChessUser = yield call(db.get, 'users', enemyUID);
			yield console.log('ENEMY: ', enemy);

			enemies.push(enemy);
		}

		yield* put(fetchEnemiesSuccess(enemies));
	} catch (err) {
		yield* put(enemyError((err as Error).message));
	}
}

export function* onFetchEnemiesStart() {
	yield* takeEvery(EnemyTypes.FETCH_ENEMIES_START, fetchEnemiesAsync);
}

export function* sendEnemyRequestAsync({
	payload: enemyUID,
}: SendEnemyRequestAction) {
	try {
		const chessUser = yield* select(selectChessUser);
		if (!chessUser) return;

		const { displayName } = chessUser;

		yield functions.callFirebaseFunction('sendEnemyRequest', {
			enemyUID,
			displayName,
		});
	} catch (err) {
		yield* put(enemyError((err as Error).message));
	}
}

export function* onSendEnemyRequest() {
	yield* takeEvery(EnemyTypes.SEND_ENEMY_REQUEST, sendEnemyRequestAsync);
}

export function* searchEnemiesAsync({
	payload: query,
}: SearchEnemiesStartAction) {
	try {
		const result: ChessUser[] = yield db.searchCollection<ChessUser>(
			query,
			'users',
			'displayName'
		);

		console.log('SEARCH RESULT: ', result);

		yield* put(searchEnemiesSuccess(result));
	} catch (err) {
		yield* put(enemyError((err as Error).message));
	}
}

export function* onSearchEnemiesStart() {
	yield* takeEvery(EnemyTypes.SEARCH_ENEMIES_START, searchEnemiesAsync);
}

export function* enemySagas() {
	yield* all([
		call(onSearchEnemiesStart),
		call(onSendEnemyRequest),
		call(onFetchEnemiesStart),
		call(onFetchEnemyInfoStart),
	]);
}
