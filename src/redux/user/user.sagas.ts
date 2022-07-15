import { all, call } from 'typed-redux-saga/macro';
import { userAuthSagas } from './sagas/user-auth.sagas';
import { userEnemyRequestsSagas } from './sagas/user-enemy-requests.sagas';
import { userStatusSagas } from './sagas/user-status.sagas';

export function* userSagas() {
	yield* all([
		call(userAuthSagas),
		call(userEnemyRequestsSagas),
		call(userStatusSagas),
	]);
}
