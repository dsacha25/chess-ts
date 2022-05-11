import { arrayUnion, FieldValue, where } from 'firebase/firestore';
import { EventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	select,
	SelectEffect,
	takeEvery,
} from 'redux-saga/effects';
import { db } from '../../../utils/classes/firestore/firestore-app';
import getErrorMessage from '../../../utils/helpers/errors/get-error-message';
import { ChatMessage } from '../../../utils/types/chat-message/chat-message';
import { ChessGameType } from '../../../utils/types/chess-game-type/chess-game-type';
import { selectProfilePicture, selectUserUID } from '../../user/user.selector';
import { SendChatMessageStartAction } from '../game.action-types';
import { chatError, sendChatMessageSuccess } from '../game.actions';
import { selectActiveGame } from '../game.selector';
import { GameTypes } from '../game.types';

export function* sendMessageAsync({
	payload: message,
}: SendChatMessageStartAction): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);
		const photoURL = yield select(selectProfilePicture);

		const game: ChessGameType | null = yield select(selectActiveGame);

		const chatMessage: ChatMessage = {
			uid,
			photoURL,
			message,
			createdAt: new Date(),
		};

		/// SEND MESSAGE TO FIREBASE
		if (!game) return;

		const error = yield db.update(`games/${game.id}/chat`, uid, {
			messages: arrayUnion(chatMessage),
		});

		console.log('error:', error);
		// If document doesn't exist, create it
		if (error) {
			const err = yield db.create(`games/${game.id}/chat`, uid, {
				messages: [chatMessage],
				photoURL,
				uid,
			});

			if (err) {
				yield put(chatError(getErrorMessage(err)));
			}
		}

		yield put(sendChatMessageSuccess(chatMessage));
	} catch (err) {
		yield put(chatError(getErrorMessage(err)));
	}
}

export function* onSendChatMessage() {
	yield takeEvery(GameTypes.SEND_MESSAGE_START, sendMessageAsync);
}

export function* gameChatSagas() {
	yield all([call(onSendChatMessage)]);
}
