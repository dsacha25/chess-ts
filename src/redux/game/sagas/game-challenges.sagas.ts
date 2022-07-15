import { where } from 'firebase/firestore';
import { all, call, put, select, takeEvery } from 'typed-redux-saga/macro';
import { db, functions } from '../../../utils/classes/firestore/firestore-app';
import { NotifSender } from '../../../utils/types/notif-sender/notif-sender';
import { PendingRequest } from '../../../utils/types/pending-request/pending-request';
import { selectChessUser, selectUserUID } from '../../user/user.selector';
import {
	AcceptGameChallengeStartAction,
	RejectGameChallengeAction,
	SendGameChallengeAction,
} from '../game.action-types';
import {
	gameChallengeResponseSuccess,
	fetchGameChallengesSuccess,
	fetchPendingChallengesStart,
	fetchPendingChallengesSuccess,
	gameError,
	fetchActiveGamesStart,
} from '../game.actions';
import { GameTypes } from '../game.types';

export function* fetchPendingChallengesAsync() {
	try {
		const uid = yield* select(selectUserUID);

		const pendingChallenges = yield* call<
			any[],
			(...args: any) => Promise<PendingRequest[]>
		>(
			db.getAll,
			`users/${uid}/pending_requests`,
			where('type', '==', 'challenge')
		);

		yield console.log('PENDING CHALLENGES: ', pendingChallenges);
		yield* put(fetchPendingChallengesSuccess(pendingChallenges));
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onFetchPendingChallenges() {
	yield* takeEvery(
		GameTypes.FETCH_PENDING_CHALLENGES_START,
		fetchPendingChallengesAsync
	);
}

export function* fetchGameChallengesAsync() {
	try {
		const uid = yield* select(selectUserUID);

		const challengeRequests = yield* call<
			any[],
			(...args: any) => Promise<NotifSender[]>
		>(db.getAll, `users/${uid}/requests`, where('type', '==', 'challenge'));

		yield console.log('GAME CHALLENGES: ', challengeRequests);
		yield* put(fetchGameChallengesSuccess(challengeRequests));
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onFetchGameChallenges() {
	yield* takeEvery(
		GameTypes.FETCH_GAME_CHALLENGES_START,
		fetchGameChallengesAsync
	);
}

export function* rejectGameChallengeAsync({
	payload: enemyUID,
}: RejectGameChallengeAction) {
	try {
		const chessUser = yield* select(selectChessUser);
		if (!chessUser) return;

		const { displayName } = chessUser;

		yield functions.callFirebaseFunction('rejectChallengeRequest', {
			enemyUID,
			displayName,
		});

		yield* put(gameChallengeResponseSuccess(enemyUID));
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onRejectChallengeRequest() {
	yield* takeEvery(GameTypes.REJECT_GAME_CHALLENGE, rejectGameChallengeAsync);
}

export function* acceptGameChallengeAsync({
	payload: { enemy, callback },
}: AcceptGameChallengeStartAction): Generator<any, void, any> {
	try {
		const chessUser = yield* select(selectChessUser);
		if (!chessUser || !chessUser.displayName) return;

		const { displayName } = chessUser;

		const data = yield functions.callFirebaseFunction(
			'acceptChallengeRequest',
			{
				enemyUID: enemy.uid,
				enemyDisplayName: enemy.displayName,
				displayName,
				gameMode: enemy.gameMode,
			}
		);

		yield console.log('DATA: ', data);

		const gameUID = data.gameUID as string;

		if (gameUID) {
			yield callback(gameUID);
		}

		yield* put(gameChallengeResponseSuccess(enemy.uid));
		yield* put(fetchActiveGamesStart());
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onAcceptChallengeRequest() {
	yield* takeEvery(
		GameTypes.ACCEPT_GAME_CHALLENGE_START,
		acceptGameChallengeAsync
	);
}

export function* sendChallengeRequestAsync({
	payload: { enemyUID, gameMode },
}: SendGameChallengeAction) {
	try {
		const user = yield* select(selectChessUser);
		if (!user) return;

		const { displayName } = user;

		yield functions.callFirebaseFunction('sendChallengeRequest', {
			enemyUID,
			displayName,
			gameMode,
		});

		yield* put(fetchPendingChallengesStart());
	} catch (err) {
		yield* put(gameError((err as Error).message));
	}
}

export function* onSendChallengeRequest() {
	yield* takeEvery(GameTypes.SEND_GAME_CHALLENGE, sendChallengeRequestAsync);
}

export function* gameChallengesSagas() {
	yield* all([
		call(onSendChallengeRequest),
		call(onAcceptChallengeRequest),
		call(onRejectChallengeRequest),
		call(onFetchGameChallenges),
		call(onFetchPendingChallenges),
	]);
}
