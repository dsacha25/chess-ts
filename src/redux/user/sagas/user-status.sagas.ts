import {
	all,
	call,
	put,
	select,
	SelectEffect,
	takeEvery,
} from 'redux-saga/effects';
import getErrorMessage from '../../../utils/helpers/errors/get-error-message';
import { setUserStatusSuccess, userError } from '../user.actions';
import { selectUserUID } from '../user.selector';
import UserTypes from '../user.types';
import { app, db, rt } from '../../../utils/classes/firestore/firestore-app';

import {
	Database,
	getDatabase,
	ref,
	set,
	onDisconnect,
	onValue,
	DatabaseReference,
} from 'firebase/database';
import { SetUserGamePresenceAction } from '../user.action-types';
import { selectActiveGame } from '../../game/game.selector';
import { ChessGameType } from '../../../utils/types/chess-game-type/chess-game-type';

export function* setUserPresence({
	payload: present,
}: SetUserGamePresenceAction): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);
		const game: ChessGameType | null = yield select(selectActiveGame);

		if (!game) return;

		if (game.black.uid === uid) {
			yield db.update('games', game.id, { blackPresent: present });
		}

		if (game.white.uid === uid) {
			yield db.update('games', game.id, { whitePresent: present });
		}
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* onSetUserGamePresence() {
	yield takeEvery(UserTypes.SET_USER_GAME_PRESENCE, setUserPresence);
}

export function* setUserStatus(): Generator<DatabaseReference> | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		// RT - REFERENCE TO ONLINE STATE
		const statusRef: DatabaseReference = yield ref(
			getDatabase(app),
			'.info/connected'
		);

		// RT - REFERENCE TO USER STATUS
		const userRef: DatabaseReference = yield ref(
			getDatabase(app),
			`/status/${uid}`
		);

		// UPDATE CLOUD FIRESTORE
		yield db.update('users', uid, { online: true });

		// UPDATE RT DATABASE
		yield onValue(statusRef, (snapshot) => {
			if (snapshot.val() === false) {
				setUserStatusSuccess(false);
				return;
			}

			onDisconnect(userRef)
				.set({ online: false })
				.then(() => {
					set(userRef, { online: true });
				});
		});

		// SET LOCAL STATE
		yield put(setUserStatusSuccess(true));
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* onSetUserStatus() {
	yield takeEvery(UserTypes.SET_USER_STATUS_START, setUserStatus);
}

export function* userStatusSagas() {
	yield all([call(onSetUserStatus), call(onSetUserGamePresence)]);
}
