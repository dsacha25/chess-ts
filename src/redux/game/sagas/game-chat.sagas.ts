import { arrayUnion } from 'firebase/firestore';
import { find, orderBy, union } from 'lodash';
import { EventChannel } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'typed-redux-saga/macro';
import { db } from '../../../utils/classes/firestore/firestore-app';
import { listener } from '../../../utils/classes/sagas/saga-listener';
import {
	ChatMessage,
	ChatMessageServer,
} from '../../../utils/types/chat-message/chat-message';
import { ChatMessages } from '../../../utils/types/chat-messages/chat-messages';
import { ChatUsers } from '../../../utils/types/chat-users/chat-users';
import { selectProfilePicture, selectUserUID } from '../../user/user.selector';
import { SendChatMessageStartAction } from '../game.action-types';
import {
	chatError,
	openChatListenerSuccess,
	sendChatMessageSuccess,
	setChatUnreadState,
	setChatUsers,
} from '../game.actions';
import { selectActiveGame } from '../game.selector';
import { GameTypes } from '../game.types';

export function* readChatMessageAsync() {
	try {
		const uid = yield* select(selectUserUID);
		const game = yield* select(selectActiveGame);
		if (!game || !uid) return;

		const enemyUID = game.black.uid === uid ? game.white.uid : game.black.uid;

		yield db
			.update(`games/${game.id}/chat`, enemyUID, { unread: false })
			.catch((err) => console.log('Unable to read chat message', err));

		yield* put(setChatUnreadState(false));
	} catch (err) {
		yield* put(chatError((err as Error).message));
	}
}

export function* onReadChatMessage() {
	yield* takeEvery(GameTypes.READ_CHAT_MESSAGE, readChatMessageAsync);
}

export function* getChatMessages(chat: ChatMessages[]) {
	yield console.log('CHAT MESSAGES: ', chat);
	const uid = yield* select(selectUserUID);
	if (!uid) return;
	let sender: ChatMessages | undefined = find(chat, (msg) => msg.uid === uid);
	let receiver: ChatMessages | undefined = find(chat, (msg) => msg.uid !== uid);
	let senderMsgs: ChatMessageServer[] = [];
	let receiverMsgs: ChatMessageServer[] = [];
	let chatUsers: ChatUsers = {};

	if (sender) {
		// manage sender messages
		senderMsgs = sender.messages;
		chatUsers.sender = { photoURL: sender.photoURL, uid: sender.uid };
	}
	if (receiver) {
		// manage receiver messages
		receiverMsgs = receiver.messages;
		chatUsers.receiver = { photoURL: receiver.photoURL, uid: receiver.uid };
		console.log('receiver: ', receiver);

		yield* put(setChatUnreadState(receiver.unread));
	}

	const allMessages = orderBy(
		union(senderMsgs, receiverMsgs),
		'createdAt',
		'asc'
	);

	console.log('ALL MESSAGES: ', allMessages);

	let prevUID: string | undefined;
	let chatSorted: ChatMessageServer[] = [];
	let storedIndex = 0;

	for (const message of allMessages) {
		if (prevUID === undefined) {
			chatSorted.push(message);
			prevUID = message.uid;
			continue;
		}

		if (prevUID === message.uid) {
			chatSorted[storedIndex].message.push(message.message[0]);
			continue;
		}

		if (prevUID !== message.uid) {
			storedIndex += 1;
			prevUID = message.uid;
			chatSorted.push(message);
		}
	}

	console.log('SORTED CHAT: ', chatSorted);
	console.log('ALL CHAT: ', allMessages);

	yield* put(setChatUsers(chatUsers));
	yield* put(openChatListenerSuccess(chatSorted));
}

export function* openChatListenerAsync() {
	try {
		const game = yield* select(selectActiveGame);

		if (!game) return;

		const chatChannel: EventChannel<ChatMessages> =
			yield listener.generateCollectionListener(`games/${game.id}/chat`);

		yield listener.initializeChannel(chatChannel, getChatMessages);
	} catch (err) {
		yield* put(chatError((err as Error).message));
	}
}

export function* onOpenChatListener() {
	yield* takeEvery(GameTypes.OPEN_CHAT_LISTENER_START, openChatListenerAsync);
}

export function* sendMessageAsync({
	payload: message,
}: SendChatMessageStartAction): Generator<any, void, any> {
	try {
		const uid = yield* select(selectUserUID);
		const photoURL = yield* select(selectProfilePicture);
		const game = yield* select(selectActiveGame);

		if (!uid || !game) return;

		const chatMessage: ChatMessage = {
			uid,
			message: [message],
			createdAt: new Date(),
		};

		/// SEND MESSAGE TO FIREBASE
		if (!game) return;

		const error = yield db.update(`games/${game.id}/chat`, uid, {
			messages: arrayUnion(chatMessage),
			unread: true,
		});

		console.log('error:', error);
		// If document doesn't exist, create it
		if (error) {
			const err = yield db.create(`games/${game.id}/chat`, uid, {
				messages: [chatMessage],
				photoURL,
				uid,
				unread: true,
			});

			if (err) {
				yield* put(chatError((err as Error).message));
			}
		}

		yield* put(sendChatMessageSuccess(chatMessage));
	} catch (err) {
		yield* put(chatError((err as Error).message));
	}
}

export function* onSendChatMessage() {
	yield* takeEvery(GameTypes.SEND_MESSAGE_START, sendMessageAsync);
}

export function* gameChatSagas() {
	yield* all([
		call(onSendChatMessage),
		call(onOpenChatListener),
		call(onReadChatMessage),
	]);
}
