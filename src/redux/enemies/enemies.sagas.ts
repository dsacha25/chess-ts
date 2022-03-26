import { all, call, put, PutEffect, takeEvery } from 'redux-saga/effects';
import { db } from '../../utils/classes/firestore/firestore-app';
import getErrorMessage from '../../utils/helpers/errors/get-error-message';
import { ChessUser } from '../../utils/types/chess-user/chess-user';
import { SearchEnemiesStartAction } from './enemies.action-types';
import { enemyError, searchEnemiesSuccess } from './enemies.actions';
import { EnemyTypes } from './enemies.types';

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
	yield all([call(onSearchEnemiesStart)]);
}
