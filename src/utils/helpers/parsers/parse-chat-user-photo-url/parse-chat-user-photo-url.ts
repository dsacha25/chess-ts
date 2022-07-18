import { ChatMessage } from '../../../types/chess/chat-message/chat-message';
import { ChatUsers } from '../../../types/users/chat-users/chat-users';

const parseChatUserPhotoURL = (
	chatMsg: ChatMessage,
	chatUsers: ChatUsers
): string => {
	if (!chatUsers) return '';
	if (chatUsers.receiver && chatMsg.uid === chatUsers.receiver.uid) {
		return chatUsers.receiver.photoURL;
	} else if (chatUsers.sender && chatMsg.uid === chatUsers.sender.uid) {
		return chatUsers.sender.photoURL;
	} else {
		return '';
	}
};

export default parseChatUserPhotoURL;
