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
import { selectChessUser, selectUserUID } from '../../user/user.selector';
import UserTypes from '../../user/user.types';
import {
	AcceptGameChallengeAction,
	RejectGameChallengeAction,
	SendGameChallengeAction,
} from '../game.action-types';
import { gameError } from '../game.actions';
import { GameTypes } from '../game.types';

export function* fetchGameChallengesAsync(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const challengeRequests = yield db.getAll(
			`users/${uid}/request`,
			where('type', '==', 'challenge')
		);

		yield console.log('GAME CHALLENGES: ', challengeRequests);
	} catch (err) {
		yield put(gameError(getErrorMessage(err)));
	}
}

export function* onFetchGameChallenges() {
	yield takeEvery(
		UserTypes.FETCH_ENEMY_REQUESTS_START,
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
	payload: enemyUID,
}: AcceptGameChallengeAction) {
	try {
		const { displayName } = yield select(selectChessUser);
		yield functions.callFirebaseFunction('acceptChallengeRequest', {
			enemyUID,
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
	]);
}
