import { all, call } from 'redux-saga/effects';
import { gameActiveSagas } from './sagas/game-active.sagas';
import { gameChallengesSagas } from './sagas/game-challenges.sagas';

export function* gameSagas() {
	yield all([call(gameChallengesSagas), call(gameActiveSagas)]);
}
