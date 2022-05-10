import { FieldValue, where } from 'firebase/firestore';
import { EventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	select,
	SelectEffect,
	takeEvery,
} from 'redux-saga/effects';
import getErrorMessage from '../../../utils/helpers/errors/get-error-message';
import { ChatMessage } from '../../../utils/types/chat-message/chat-message';
import { selectProfilePicture, selectUserUID } from '../../user/user.selector';
import { SendChatMessageStartAction } from '../game.action-types';
import { chatError } from '../game.actions';
import { GameTypes } from '../game.types';

export function* sendMessageAsync({
	payload: message,
}: SendChatMessageStartAction): Generator | SelectEffect {
	try {
		const uid = yield select(selectUserUID);
		const photoURL = yield select(selectProfilePicture);

		const chatMessage: ChatMessage = {
			uid,
			photoURL,
			message,
			createdAt: new Date(),
		};

		/// SEND MESSAGE TO FIREBASE
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
