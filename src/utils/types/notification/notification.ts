import { Timestamp } from 'firebase/firestore';
import { NotifSender } from '../notif-sender/notif-sender';
import { NotificationTypes } from '../notification-types/notification-types';

export interface Notification {
	id: string;
	type: NotificationTypes;
	sender: NotifSender;
	reciever: string;
	unread: boolean;
	createdAt: Date | Timestamp;
}
