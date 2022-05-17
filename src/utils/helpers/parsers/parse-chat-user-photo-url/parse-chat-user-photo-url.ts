import { ChatMessage } from '../../../types/chat-message/chat-message';
import { ChatUsers } from '../../../types/chat-users/chat-users';

const parseChatUserPhotoURL = (
	chatMsg: ChatMessage,
	chatUsers: ChatUsers
): string => {
	if (!chatUsers || !chatUsers.receiver || !chatUsers.sender) return '';
	return chatMsg.uid === chatUsers.receiver.uid
		? chatUsers.receiver.photoURL
		: chatUsers.sender.photoURL;
};

export default parseChatUserPhotoURL;
