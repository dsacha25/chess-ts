import { Timestamp } from 'firebase/firestore';

export interface ChatMessage {
	uid: string;
	message: string[];
	createdAt: Date | Timestamp;
}

export interface ChatMessageServer {
	uid: string;
	message: string[];
	createdAt: Timestamp;
}
