import { all, call } from 'redux-saga/effects';
import { notificationSagas } from './notifications/notifications.sagas';
import { userSagas } from './user/user.sagas';

function* rootSaga() {
	yield all([call(userSagas), call(notificationSagas)]);
}

export default rootSaga;
