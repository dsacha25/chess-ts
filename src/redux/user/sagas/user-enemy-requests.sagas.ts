import { where } from 'firebase/firestore';
import { all, call, put, select, takeEvery } from 'typed-redux-saga/macro';
import { db, functions } from '../../../utils/classes/firestore/firestore-app';
import { NotifSender } from '../../../utils/types/notif-sender/notif-sender';
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
		yield* call(functions.callFirebaseFunction, 'rejectEnemyRequest', {
			enemyUID,
		});
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* onRejectEnemyRequest() {
	yield* takeEvery(UserTypes.REJECT_ENEMY_REQUEST, rejectEnemyRequestAsync);
}

export function* acceptEnemyRequestAsync({
	payload: enemyUID,
}: AcceptEnemyRequestAction) {
	try {
		const user = yield* select(selectUserAuth);
		if (!user) return;
		const { displayName } = user;

		yield* call(functions.callFirebaseFunction, 'acceptEnemyRequest', {
			enemyUID,
			displayName,
		});
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* onAcceptEnemyRequest() {
	yield* takeEvery(UserTypes.ACCEPT_ENEMY_REQUEST, acceptEnemyRequestAsync);
}

export function* fetchEnemyRequestsAsync() {
	try {
		const uid = yield* select(selectUserUID);
		if (!uid) return;

		const enemyRequests = yield* call<
			any[],
			(args: any) => Promise<NotifSender[]>
		>(db.getAll, `users/${uid}/requests`, where('type', '==', 'enemy_request'));

		yield console.log('ENEMY REQUESTS:', enemyRequests);
		yield* put(fetchEnemyRequestsSuccess(enemyRequests));
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* onFetchEnemyRequests() {
	yield* takeEvery(
		UserTypes.FETCH_ENEMY_REQUESTS_START,
		fetchEnemyRequestsAsync
	);
}

export function* userEnemyRequestsSagas() {
	yield* all([
		call(onFetchEnemyRequests),
		call(onAcceptEnemyRequest),
		call(onRejectEnemyRequest),
	]);
}
