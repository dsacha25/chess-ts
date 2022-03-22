import { User } from 'firebase/auth';
import {
	all,
	call,
	put,
	PutEffect,
	select,
	SelectEffect,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects';
import {
	auth,
	db,
	storage,
} from '../../../utils/classes/firestore/firestore-app';
import { listener } from '../../../utils/classes/sagas/saga-listener';
import getErrorMessage from '../../../utils/helpers/errors/get-error-message';
import {
	logInSuccess,
	createAccountSuccess,
	logOutStart,
	logOutSuccess,
	checkUserSession,
	userError,
	getChessUserSuccess,
} from '../user.actions';
import {
	DeleteUserAccountAction,
	LogInStartAction,
	LogOutStartAction,
	CreateAccountStartAction,
} from '../user.action-types';
import UserTypes from '../user.types';
import { UploadResult } from 'firebase/storage';
import {
	selectNewCredentails,
	selectUserAuth,
	selectUserUID,
} from '../user.selector';
import { NewCredentials } from '../../../utils/types/new-credentials/new-credentials';
import { EventChannel } from 'redux-saga';
import { ChessUser } from '../../../utils/types/chess-user/chess-user';

// ==== UPLOAD PHOTO TO STORAGE
export function* uploadProfilePictureToStorage(
	blob: Blob,
	uid: string
): Generator<string> | SelectEffect {
	try {
		const path = `users/${uid}/userPhoto_${uid}`;

		const uploadResult: UploadResult = yield storage.uploadFile(blob, path);

		const photoURL: string = yield storage.getFileUrl(uploadResult.ref);

		return photoURL;
	} catch (err) {
		yield userError(getErrorMessage(err));
	}
}

export function* uploadUserPhotoAsync(uid: string): Generator | SelectEffect {
	try {
		const { photoURL }: NewCredentials = yield select(selectNewCredentails);
		if (!photoURL) return;
		/// converts DATA URL to BLOB
		console.log('PHOTO URL: ', photoURL);

		const url: Blob = yield fetch(photoURL.image).then((res) => res.blob());

		if (url instanceof Blob) {
			const photoURL: string = yield call(
				uploadProfilePictureToStorage,
				url,
				uid
			);

			console.log('RESULT: ', photoURL);

			/// UPDATE AUTH OBJECT
			yield auth.updateUserProfile({ photoURL });

			/// UPDATE CHESS-USER OBJECT
			yield db
				.update('users', uid, {
					photoURL,
				})
				.catch((err) => {
					console.log('UPLOAD ERROR: ', err);
				});
		}
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* checkUserState(user: User) {
	yield console.log('USER: ', user);

	yield put(logInSuccess(user));

	return;
}

export function* openAuthListener(): Generator | SelectEffect {
	try {
		yield console.log('USER LISTENER OPENED');

		yield listener.initializeListener<User>(
			listener.generateAuthListener,
			checkUserState
		);
		yield console.log('LISTENER CLOSED');

		const auth = yield select(selectUserAuth);

		if (auth) {
			yield put(logOutStart());
		}
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

/// ==== LISTEN FOR CHESS USER
export function* listenForChessUser(chessUser: ChessUser) {
	yield console.log('CHESS USER:', chessUser);

	yield put(getChessUserSuccess(chessUser));
}

export function* openChessUserListener(): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);

		const docRef = yield db.getDocumentReference(`users/${uid}`);

		const chessUserChannel: EventChannel<ChessUser> =
			yield listener.generateDocumentListener<ChessUser>(docRef);

		yield listener.initializeChannel<ChessUser>(
			chessUserChannel,
			listenForChessUser
		);
	} catch (err) {
		yield put(userError(getErrorMessage(err)));
	}
}

export function* onGetChessUserStart() {
	yield takeEvery(UserTypes.GET_CHESS_USER_START, openChessUserListener);
}

/// ==== CREATE ACCOUNT
export function* createAccountAsync({
	payload: { credentials, callback },
}: CreateAccountStartAction): Generator<Promise<User>> | PutEffect {
	try {
		yield console.log('CREDENTIALS: ', credentials);

		const user: User = yield auth.createNewUser(credentials);

		if (user && callback) yield callback();

		yield put(createAccountSuccess(user));
		yield put(checkUserSession());
		yield call(uploadUserPhotoAsync, user.uid);
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
