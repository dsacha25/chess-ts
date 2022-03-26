import { Timestamp } from 'firebase/firestore';
import { NotificationTypes } from '../notification-types/notification-types';

export interface Notification {
	id: string;
	type: NotificationTypes;
	sender: string;
	reciever: string;
	unread: boolean;
	createdAt: Date | Timestamp;
}
