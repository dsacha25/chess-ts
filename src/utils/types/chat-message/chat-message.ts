import { Timestamp } from 'firebase/firestore';

export interface ChatMessage {
	uid: string;
	message: string;
	photoURL: string;
	createdAt: Date | Timestamp;
}
