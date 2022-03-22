import { User } from 'firebase/auth';
import {
	all,
	call,
	put,
	PutEffect,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects';
import { auth } from '../../../utils/classes/firestore/firestore-app';
import { listener } from '../../../utils/classes/sagas/saga-listener';
import getErrorMessage from '../../../utils/helpers/errors/get-error-message';
import {
	logInSuccess,
	createAccountSuccess,
	logOutStart,
	logOutSuccess,
	checkUserSession,
	userError,
} from '../user.actions';
import {
	DeleteUserAccountAction,
	LogInStartAction,
	LogOutStartAction,
	CreateAccountStartAction,
} from '../user.action-types';
import UserTypes from '../user.types';

export function* checkUserState(user: User | null | string) {
	if (user && typeof user !== 'string') {
		console.log('USER LOG IN: ', user);

		yield put(logInSuccess(user));
	} else {
		yield put(logOutStart());
	}
}

export function* openAuthListener() {
	try {
		yield console.log('USER LISTENER OPENED');

		yield listener.initializeListener(
			listener.generateAuthListener,
			checkUserState
		);
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* onOpenAuthListener() {
	yield takeEvery(UserTypes.CHECK_USER_SESSION, openAuthListener);
}

export function* checkUserSessionAsync(): Generator<PutEffect> | User | null {
	const user: User = yield auth.getCurrentUser();
	if (user) {
		yield put(logInSuccess(user));
	}
}

export function* checkUserAuthSession() {
	yield takeEvery(UserTypes.CHECK_USER_SESSION, checkUserSessionAsync);
}

export function* logInUserAsync({
	payload: { credentials, callback },
}: LogInStartAction): Generator<PutEffect> | Promise<User> {
	const { email, password } = credentials;
	try {
		const user: User = yield auth.logInUser(email, password);
		console.log('USER: ', user);

		if (user && callback) {
			callback();
		}

		yield put(logInSuccess(user));
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* logInUser() {
	yield takeEvery(UserTypes.LOG_IN_START, logInUserAsync);
}

export function* createAccountAsync({
	payload: { credentials, callback },
}: CreateAccountStartAction): Generator<Promise<User>> | PutEffect {
	try {
		yield console.log('CREDENTIALS: ', credentials);

		const user: User = yield auth.createNewUser(credentials);

		if (user && callback) callback();

		yield put(createAccountSuccess(user));
		yield put(checkUserSession());
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* onCreateAccount() {
	yield takeEvery(UserTypes.CREATE_ACCOUNT_START, createAccountAsync);
}

export function* logOutAsync({
	payload: callback,
}: LogOutStartAction): Generator<void | PutEffect> | Promise<void> {
	yield auth.logOutUser();
	yield put(logOutSuccess());
	if (callback) {
		callback();
	}
}

export function* onLogOutUser() {
	yield takeLatest(UserTypes.LOG_OUT_START, logOutAsync);
}

export function* deleteUserAccountAsync({
	payload: credential,
}: DeleteUserAccountAction) {
	try {
		yield auth.reauthenticate(credential);
		yield auth.deleteUser();
		yield auth.logOutUser();
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* onDeleteUserAccount() {
	yield takeLatest(UserTypes.DELETE_USER_ACCOUNT, deleteUserAccountAsync);
}

export function* userAuthSagas() {
	yield all([
		call(logInUser),
		call(onCreateAccount),
		call(onLogOutUser),
		call(onDeleteUserAccount),
		call(onOpenAuthListener),
	]);
}
