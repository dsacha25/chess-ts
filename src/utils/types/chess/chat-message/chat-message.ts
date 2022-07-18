import { Timestamp } from 'firebase/firestore';

/**
 * TODO: PICK ONE
 */
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
