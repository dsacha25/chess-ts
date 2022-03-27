import { all, call } from 'redux-saga/effects';
import { enemySagas } from './enemies/enemies.sagas';
import { gameSagas } from './game/game.sagas';
import { notificationSagas } from './notifications/notifications.sagas';
import { userSagas } from './user/user.sagas';

function* rootSaga() {
	yield all([
		call(userSagas),
		call(notificationSagas),
		call(enemySagas),
		call(gameSagas),
	]);
}

export default rootSaga;
