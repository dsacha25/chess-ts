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
import { fetchEnemyRequestsSuccess, userError } from '../user.actions';
import { selectUserUID } from '../user.selector';
import UserTypes from '../user.types';

export function* fetchEnemyRequestsAsync(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const enemyRequests = yield db.getAll(`users/${uid}/requests`);

		yield console.log('ENEMY REQUESTS:', enemyRequests);
		yield put(fetchEnemyRequestsSuccess(enemyRequests));
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* onFetchEnemyRequests() {
	yield takeEvery(
		UserTypes.FETCH_ENEMY_REQUESTS_START,
		fetchEnemyRequestsAsync
	);
}

export function* userEnemyRequestsSagas() {
	yield all([call(onFetchEnemyRequests)]);
}
