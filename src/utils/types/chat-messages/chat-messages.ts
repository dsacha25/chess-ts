import { ChatMessage, ChatMessageServer } from '../chat-message/chat-message';

export interface ChatMessages {
	messages: ChatMessageServer[];
	photoURL: string;
	uid: string;
}
