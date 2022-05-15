import { all, call } from 'redux-saga/effects';
import { gameActiveSagas } from './sagas/game-active.sagas';
import { gameChallengesSagas } from './sagas/game-challenges.sagas';
import { gameChatSagas } from './sagas/game-chat.sagas';
import { gamesInactiveSagas } from './sagas/game-inactive.sagas';

export function* gameSagas() {
	yield all([
		call(gameChallengesSagas),
		call(gameActiveSagas),
		call(gameChatSagas),
		call(gamesInactiveSagas),
	]);
}
