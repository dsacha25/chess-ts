import { all, call } from 'redux-saga/effects';
import { userAuthSagas } from './sagas/user-auth.sagas';

export function* userSagas() {
	yield all([call(userAuthSagas)]);
}
