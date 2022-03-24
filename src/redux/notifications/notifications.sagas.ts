import { all, call } from 'redux-saga/effects';

export function* onOpenNotificationListener() {
	yield;
}

export function* notificationSagas() {
	yield all([call(onOpenNotificationListener)]);
}
