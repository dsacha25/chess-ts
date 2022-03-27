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
import { NotifSender } from '../../../utils/types/notif-sender/notif-sender';
import { PendingRequest } from '../../../utils/types/pending-request/pending-request';
import { selectChessUser, selectUserUID } from '../../user/user.selector';
import {
	AcceptGameChallengeAction,
	RejectGameChallengeAction,
	SendGameChallengeAction,
} from '../game.action-types';
import {
	fetchGameChallengesSuccess,
	fetchPendingChallengesStart,
	fetchPendingChallengesSuccess,
	gameError,
} from '../game.actions';
import { GameTypes } from '../game.types';

export function* fetchPendingChallengesAsync(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const pendingChallenges = yield db.getAll<PendingRequest[]>(
			`users/${uid}/pending_requests`,
			where('type', '==', 'challenge')
		);

		yield console.log('PENDING CHALLENGES: ', pendingChallenges);
		yield put(fetchPendingChallengesSuccess(pendingChallenges));
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onFetchPendingChallenges() {
	yield takeEvery(
		GameTypes.FETCH_PENDING_CHALLENGES_START,
		fetchPendingChallengesAsync
	);
}

export function* fetchGameChallengesAsync(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const challengeRequests = yield db.getAll<NotifSender[]>(
			`users/${uid}/requests`,
			where('type', '==', 'challenge')
		);

		yield console.log('GAME CHALLENGES: ', challengeRequests);
		yield put(fetchGameChallengesSuccess(challengeRequests));
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onFetchGameChallenges() {
	yield takeEvery(
		GameTypes.FETCH_GAME_CHALLENGES_START,
		fetchGameChallengesAsync
	);
}

export function* rejectGameChallengeAsync({
	payload: enemyUID,
}: RejectGameChallengeAction) {
	try {
		const { displayName } = yield select(selectChessUser);
		yield functions.callFirebaseFunction('rejectChallengeRequest', {
			enemyUID,
			displayName,
		});
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onRejectChallengeRequest() {
	yield takeEvery(GameTypes.REJECT_GAME_CHALLENGE, rejectGameChallengeAsync);
}

export function* acceptGameChallengeAsync({
	payload: enemy,
}: AcceptGameChallengeAction) {
	try {
		const { displayName } = yield select(selectChessUser);
		yield functions.callFirebaseFunction('acceptChallengeRequest', {
			enemyUID: enemy.uid,
			enemyDisplayName: enemy.displayName,
			displayName,
		});
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onAcceptChallengeRequest() {
	yield takeEvery(GameTypes.ACCEPT_GAME_CHALLENGE, acceptGameChallengeAsync);
}

export function* sendChallengeRequestAsync({
	payload: enemyUID,
}: SendGameChallengeAction) {
	try {
		const { displayName } = yield select(selectChessUser);

		yield functions.callFirebaseFunction('sendChallengeRequest', {
			enemyUID,
			displayName,
		});

		yield put(fetchPendingChallengesStart());
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onSendChallengeRequest() {
	yield takeEvery(GameTypes.SEND_GAME_CHALLENGE, sendChallengeRequestAsync);
}

export function* gameChallengesSagas() {
	yield all([
		call(onSendChallengeRequest),
		call(onAcceptChallengeRequest),
		call(onRejectChallengeRequest),
		call(onFetchGameChallenges),
		call(onFetchPendingChallenges),
	]);
}
