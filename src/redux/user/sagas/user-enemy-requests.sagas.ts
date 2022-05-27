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
import {
	AcceptEnemyRequestAction,
	RejectEnemyRequestAction,
} from '../user.action-types';
import { fetchEnemyRequestsSuccess, userError } from '../user.actions';
import { selectUserAuth, selectUserUID } from '../user.selector';
import UserTypes from '../user.types';

export function* rejectEnemyRequestAsync({
	payload: enemyUID,
}: RejectEnemyRequestAction) {
	try {
		yield functions.callFirebaseFunction('rejectEnemyRequest', { enemyUID });
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* onRejectEnemyRequest() {
	yield takeEvery(UserTypes.REJECT_ENEMY_REQUEST, rejectEnemyRequestAsync);
}

export function* acceptEnemyRequestAsync({
	payload: enemyUID,
}: AcceptEnemyRequestAction): Generator | SelectEffect {
	try {
		const { displayName } = yield select(selectUserAuth);

		yield functions.callFirebaseFunction('acceptEnemyRequest', {
			enemyUID,
			displayName,
		});
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* onAcceptEnemyRequest() {
	yield takeEvery(UserTypes.ACCEPT_ENEMY_REQUEST, acceptEnemyRequestAsync);
}

export function* fetchEnemyRequestsAsync(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const enemyRequests = yield db.getAll(
			`users/${uid}/requests`,
			where('type', '==', 'enemy_request')
		);

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
	yield all([
		call(onFetchEnemyRequests),
		call(onAcceptEnemyRequest),
		call(onRejectEnemyRequest),
	]);
}
