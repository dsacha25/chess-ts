import { Timestamp } from 'firebase/firestore';

export interface ChatMessageProps {
	sender: boolean;
	messages: string[];
	photoURL?: string;
	createdAt: Date | Timestamp;
}
