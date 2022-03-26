import {
	all,
	call,
	put,
	PutEffect,
	select,
	SelectEffect,
	takeEvery,
} from 'redux-saga/effects';
import { db, functions } from '../../utils/classes/firestore/firestore-app';
import getErrorMessage from '../../utils/helpers/errors/get-error-message';
import { ChessUser } from '../../utils/types/chess-user/chess-user';
import { selectChessUser } from '../user/user.selector';
import {
	SearchEnemiesStartAction,
	SendEnemyRequestAction,
} from './enemies.action-types';
import { enemyError, searchEnemiesSuccess } from './enemies.actions';
import { EnemyTypes } from './enemies.types';

export function* sendEnemyRequestAsync({
	payload: enemyUID,
}: SendEnemyRequestAction): Generator | SelectEffect {
	try {
		const { displayName } = yield select(selectChessUser);

		yield functions.callFirebaseFunction('sendEnemyRequest', {
			enemyUID,
			displayName,
		});
	} catch (err) {
		yield put(enemyError(getErrorMessage(err)));
	}
}

export function* onSendEnemyRequest() {
	yield takeEvery(EnemyTypes.SEND_ENEMY_REQUEST, sendEnemyRequestAsync);
}

export function* searchEnemiesAsync({
	payload: query,
}: SearchEnemiesStartAction): Generator<Promise<ChessUser[]>> | PutEffect {
	try {
		const result: ChessUser[] = yield db.searchCollection<ChessUser>(
			query,
			'users',
			'displayName'
		);

		console.log('SEARCH RESULT: ', result);

		yield put(searchEnemiesSuccess(result));
	} catch (err) {
		yield put(enemyError(getErrorMessage(err)));
	}
}

export function* onSearchEnemiesStart() {
	yield takeEvery(EnemyTypes.SEARCH_ENEMIES_START, searchEnemiesAsync);
}

export function* enemySagas() {
	yield all([call(onSearchEnemiesStart), call(onSendEnemyRequest)]);
}
