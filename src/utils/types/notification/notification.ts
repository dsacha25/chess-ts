import { Timestamp } from 'firebase/firestore';

export interface Notification {
	id: string;
	message: string;
	source_uid: string;
	unread: boolean;
	createdAt: Date | Timestamp;
}
