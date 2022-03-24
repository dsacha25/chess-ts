import { Timestamp } from 'firebase/firestore';

export interface Notification {
	id: string;
	message: string;
	source_uid: string;
	read: boolean;
	createdAt: Date | Timestamp;
}
