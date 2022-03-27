import { all, call } from 'redux-saga/effects';
import { gameChallengesSagas } from './sagas/game-challenges.sagas';

export function* gameSagas() {
	yield all([call(gameChallengesSagas)]);
}
