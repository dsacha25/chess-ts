import { all, call, put, select, takeEvery } from 'typed-redux-saga/macro';
import { setUserStatusSuccess, userError } from '../user.actions';
import { selectUserUID } from '../user.selector';
import UserTypes from '../user.types';
import { app, db } from '../../../utils/classes/firestore/firestore-app';

import {
	getDatabase,
	ref,
	set,
	onDisconnect,
	onValue,
} from 'firebase/database';
import { SetUserGamePresenceAction } from '../user.action-types';
import { ChessGameType } from '../../../utils/types/chess/chess-game-type/chess-game-type';
import { getPromiseReturn } from '../../../utils/helpers/sagas/get-return-type';

export function* setUserPresence({
	payload: { present, gameUID },
}: SetUserGamePresenceAction) {
	try {
		const uid = yield* select(selectUserUID);
		if (!uid) return;

		const game = yield* call<
			any[],
			getPromiseReturn<ChessGameType | undefined>
		>(db.get, 'games', gameUID);

		if (!game) return;

		if (game.black.uid === uid) {
			yield* call(db.update, 'games', gameUID, { blackPresent: present });
		}

		if (game.white.uid === uid) {
			yield* call(db.update, 'games', gameUID, { whitePresent: present });
		}
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* onSetUserGamePresence() {
	yield* takeEvery(UserTypes.SET_USER_GAME_PRESENCE, setUserPresence);
}

export function* setUserStatus() {
	try {
		const uid = yield* select(selectUserUID);
		if (!uid) return;

		// RT - REFERENCE TO ONLINE STATE
		const statusRef = yield* call(ref, getDatabase(app), '.info/connected');

		// RT - REFERENCE TO USER STATUS
		const userRef = yield* call(ref, getDatabase(app), `/status/${uid}`);

		// UPDATE CLOUD FIRESTORE
		yield* call(db.update, 'users', uid, { online: true });

		// UPDATE RT DATABASE
		yield onValue(statusRef, (snapshot) => {
			if (snapshot.val() === false) {
				setUserStatusSuccess(false);
			}

			onDisconnect(userRef)
				.set({ online: false })
				.then(() => {
					set(userRef, { online: true });
				});
		});

		// SET LOCAL STATE
		yield* put(setUserStatusSuccess(true));
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* onSetUserStatus() {
	yield* takeEvery(UserTypes.SET_USER_STATUS_START, setUserStatus);
}

export function* userStatusSagas() {
	yield* all([call(onSetUserStatus), call(onSetUserGamePresence)]);
}
