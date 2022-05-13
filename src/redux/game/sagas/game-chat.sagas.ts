import { arrayUnion, FieldValue, where } from 'firebase/firestore';
import { find, orderBy, union, unionWith } from 'lodash';
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
import { listener } from '../../../utils/classes/sagas/saga-listener';
import getErrorMessage from '../../../utils/helpers/errors/get-error-message';
import {
	ChatMessage,
	ChatMessageServer,
} from '../../../utils/types/chat-message/chat-message';
import { ChatMessages } from '../../../utils/types/chat-messages/chat-messages';
import { ChessGameType } from '../../../utils/types/chess-game-type/chess-game-type';
import { selectProfilePicture, selectUserUID } from '../../user/user.selector';
import { SendChatMessageStartAction } from '../game.action-types';
import {
	chatError,
	openChatListenerSuccess,
	sendChatMessageSuccess,
} from '../game.actions';
import { selectActiveGame } from '../game.selector';
import { GameTypes } from '../game.types';

export function* getChatMessages(
	chat: ChatMessages[]
): Generator | SelectEffect {
	yield console.log('CHAT MESSAGES: ', chat);
	const uid = yield select(selectUserUID);
	let sender: ChatMessages | undefined = find(chat, (msg) => msg.uid === uid);
	let receiver: ChatMessages | undefined = find(chat, (msg) => msg.uid !== uid);
	let senderMsgs: ChatMessageServer[] = [];
	let receiverMsgs: ChatMessageServer[] = [];
	if (sender) {
		// manage sender messages
		senderMsgs = sender.messages;
	}
	if (receiver) {
		// manage receiver messages
		receiverMsgs = receiver.messages;
	}

	const allMessages = orderBy(
		union(senderMsgs, receiverMsgs),
		'createdAt',
		'asc'
	);

	console.log('ALL MESSAGES: ', allMessages);

	let prevMessage;
	let all = allMessages;
	for (const message of allMessages) {
		prevMessage = message;
		let start = 0;
		const index = allMessages.findIndex((msg) => msg.uid === message.uid);
		console.log('INDEX OF LAST MESSAGE: ', index);

		if (index > 0) {
			all = all.slice(0, index);
		}

		console.log('All:  ', all);

		if (prevMessage.uid === message.uid) {
		}
	}

	yield put(openChatListenerSuccess(allMessages));
}

export function* openChatListenerAsync(): Generator | SelectEffect {
	try {
		const game: ChessGameType | null = yield select(selectActiveGame);

		if (!game) return;

		const chatChannel: EventChannel<ChatMessages> =
			yield listener.generateCollectionListener(`games/${game.id}/chat`);

		yield listener.initializeChannel(chatChannel, getChatMessages);
	} catch (err) {
		yield put(chatError(getErrorMessage(err)));
	}
}

export function* onOpenChatListener() {
	yield takeEvery(GameTypes.OPEN_CHAT_LISTENER_START, openChatListenerAsync);
}

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
	yield all([call(onSendChatMessage), call(onOpenChatListener)]);
}
