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

export function* setUserStatus(): Generator<DatabaseReference> | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const statusRef: DatabaseReference = yield ref(
			getDatabase(app),
			'.info/connected'
		);

		const userRef: DatabaseReference = yield ref(
			getDatabase(app),
			`/status/${uid}`
		);

		yield db.update('users', uid, { online: true });

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

		yield put(setUserStatusSuccess(true));

		// yield rt.writeData(`/status/${uid}`, { online: true });
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* onSetUserStatus() {
	yield takeEvery(UserTypes.SET_USER_STATUS_START, setUserStatus);
}

export function* userStatusSagas() {
	yield all([call(onSetUserStatus)]);
}
