import { User } from 'firebase/auth';
import {
	all,
	call,
	put,
	select,
	takeEvery,
	takeLatest,
} from 'typed-redux-saga/macro';
import {
	auth,
	db,
	storage,
} from '../../../utils/classes/firestore/firestore-app';
import { listener } from '../../../utils/classes/sagas/saga-listener';
import {
	logInSuccess,
	createAccountSuccess,
	logOutStart,
	logOutSuccess,
	checkUserSession,
	userError,
	getChessUserSuccess,
	getChessUserStart,
	reauthenticateSuccess,
	deleteUserAccount,
} from '../user.actions';
import {
	DeleteUserAccountAction,
	LogInStartAction,
	LogOutStartAction,
	CreateAccountStartAction,
	UpdateProfileInfoAction,
	ReauthenticateStartActon,
} from '../user.action-types';
import UserTypes from '../user.types';
import {
	selectNewCredentails,
	selectUserAuth,
	selectUserUID,
} from '../user.selector';
import { ChessUser } from '../../../utils/types/chess-user/chess-user';
import { BaseImage } from '../../../utils/types/image-types/base-image/base-image';
import { EventChannel } from 'redux-saga';
import { DocumentReference } from 'firebase/firestore';
import getReturn from '../../../utils/helpers/sagas/get-return-type';

export function* reauthenticateUser({
	payload: credentials,
}: ReauthenticateStartActon) {
	try {
		yield* call(auth.reauthenticate, credentials);

		yield* put(reauthenticateSuccess());

		yield* put(deleteUserAccount(credentials));
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

// ==== REAUTHENTICATE
export function* onReauthenticateStart() {
	yield* takeEvery(UserTypes.REAUTHENTICATE_START, reauthenticateUser);
}

// ==== UPDATE PROFILE
export function* updateProfilePicture(photoURL: BaseImage) {
	try {
		const uid = yield* select(selectUserUID);
		if (!uid) return;

		yield console.log('PHOTO URL: ', photoURL);

		const url: Blob = yield fetch(photoURL.image).then((res) => res.blob());

		if (url instanceof Blob) {
			const photo = yield* call(uploadProfilePictureToStorage, url, uid);

			if (typeof photo !== 'string') return;

			console.log('RESULT: ', photo);

			if (!photo) {
				console.log('NO PHOTO');
				return;
			}

			/// UPDATE AUTH OBJECT
			yield* call(auth.updateUserProfile, { photoURL: photo });

			/// UPDATE CHESS-USER OBJECT
			yield* call(db.update, 'users', uid, {
				photoURL: photo,
			});
		}
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* updateProfileAsync({
	payload: updateCredentials,
}: UpdateProfileInfoAction) {
	try {
		// yield console.log('CREDENTIALS: ', auth.updateUserProfile);

		const { displayName, email, photoURL } = updateCredentials;

		if (photoURL) {
			yield* call(updateProfilePicture, photoURL);
		}

		if (displayName) {
			yield* call(auth.updateUserProfile, { displayName });
		}

		if (email) {
			yield* call(auth.updateEmailAddress, email);
		}
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* onUpdateProfileInfo() {
	yield* takeEvery(UserTypes.UPDATE_PROFILE_INFO, updateProfileAsync);
}

// ==== UPLOAD PHOTO TO STORAGE
export function* uploadProfilePictureToStorage(blob: Blob, uid: string) {
	try {
		const path = `users/${uid}/userPhoto_${uid}`;

		const uploadResult = yield* call(storage.uploadFile, blob, path);

		const photoURL = yield* call(storage.getFileUrl, uploadResult.ref);

		return photoURL;
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* uploadUserPhotoAsync(uid: string) {
	try {
		const credentials = yield* select(selectNewCredentails);
		if (!credentials) return;

		const { photoURL } = credentials;
		/// converts DATA URL to BLOB
		if (!photoURL) return;

		console.log('PHOTO URL: ', photoURL);

		const url: Blob = yield fetch(photoURL.image).then((res) => res.blob());

		if (url instanceof Blob) {
			const photoURL = yield* call(uploadProfilePictureToStorage, url, uid);

			console.log('RESULT: ', photoURL);

			if (!photoURL || typeof photoURL !== 'string') return;

			/// UPDATE AUTH OBJECT
			yield* call(auth.updateUserProfile, { photoURL });

			/// UPDATE CHESS-USER OBJECT
			yield db
				.update('users', uid, {
					photoURL,
				})
				.catch((err) => {
					console.log('UPLOAD ERROR: ', err);
				});
		}

		yield* put(getChessUserStart());
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* checkUserState(user: User) {
	yield* put(logInSuccess(user));
}

export function* openAuthListener() {
	try {
		yield console.log('AUTH LISTEN');
		yield listener.initializeListener(
			listener.generateAuthListener,
			checkUserState
		);

		const auth = yield* select(selectUserAuth);

		if (auth) {
			yield* put(logOutStart());
		}
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* onOpenAuthListener() {
	yield* takeEvery(UserTypes.CHECK_USER_SESSION, openAuthListener);
}

export function* checkUserSessionAsync() {
	try {
		const user: User = yield auth.getCurrentUser();
		yield console.log('CHECK SESSION: ', user);

		if (user) {
			yield* put(logInSuccess(user));
		}
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* checkUserAuthSession() {
	yield* takeEvery(UserTypes.CHECK_USER_SESSION, checkUserSessionAsync);
}

export function* logInUserAsync({
	payload: { credentials, callback },
}: LogInStartAction) {
	const { email, password } = credentials;
	try {
		const user = yield* call(auth.logInUser, email, password);
		yield console.log('USER: ', user);

		if (user && callback) {
			callback();
		}

		yield* put(logInSuccess(user));
		yield* put(getChessUserStart());
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* logInUser() {
	yield* takeEvery(UserTypes.LOG_IN_START, logInUserAsync);
}

/// ==== LISTEN FOR CHESS USER
export function* listenForChessUser(chessUser: ChessUser) {
	yield* put(getChessUserSuccess(chessUser));
}

export function* openChessUserListener(): Generator<any, void, any> {
	try {
		const uid = yield* select(selectUserUID);
		if (!uid) return;

		const docRef = yield* call<any[], getReturn<DocumentReference<ChessUser>>>(
			db.getDocumentReference,
			`users/${uid}`
		);

		const chessUserChannel = yield* call<
			DocumentReference<ChessUser>[],
			getReturn<EventChannel<ChessUser>>
		>(listener.generateDocumentListener, docRef);

		/**
		 * Stop listening to user to updates
		 */
		yield takeEvery(UserTypes.CLOSE_CHESS_USER_LISTENER, function* () {
			yield console.log('CLOSE_CHESS_USER_LISTENER');
			yield chessUserChannel.close();
		});

		/**
		 * Initialize user listener
		 */
		yield listener.initializeChannel(chessUserChannel, listenForChessUser);
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* onGetChessUserStart() {
	yield* takeEvery(UserTypes.GET_CHESS_USER_START, openChessUserListener);
}

/// ==== CREATE ACCOUNT
export function* createAccountAsync({
	payload: { credentials, callback },
}: CreateAccountStartAction) {
	try {
		yield console.log('CREDENTIALS: ', credentials);

		const user: User = yield auth.createNewUser(credentials);

		if (user && callback) yield callback();

		yield* put(createAccountSuccess(user));
		yield* put(checkUserSession());
		yield* call(uploadUserPhotoAsync, user.uid);
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* onCreateAccount() {
	yield* takeEvery(UserTypes.CREATE_ACCOUNT_START, createAccountAsync);
}

export function* logOutAsync({ payload: callback }: LogOutStartAction) {
	yield auth.logOutUser();
	yield* put(logOutSuccess());
	if (callback) {
		callback();
	}
}

export function* onLogOutUser() {
	yield* takeLatest(UserTypes.LOG_OUT_START, logOutAsync);
}

export function* deleteUserAccountAsync({
	payload: credential,
}: DeleteUserAccountAction) {
	try {
		yield auth.reauthenticate(credential);
		yield auth.deleteUser();
		yield auth.logOutUser();
	} catch (err) {
		yield* put(userError((err as Error).message));
	}
}

export function* onDeleteUserAccount() {
	yield* takeLatest(UserTypes.DELETE_USER_ACCOUNT, deleteUserAccountAsync);
}

export function* userAuthSagas() {
	yield* all([
		call(logInUser),
		call(onCreateAccount),
		call(onLogOutUser),
		call(onDeleteUserAccount),
		call(onOpenAuthListener),
		call(onGetChessUserStart),
		call(onUpdateProfileInfo),
	]);
}
