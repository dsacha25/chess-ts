import { Timestamp } from 'firebase/firestore';
import { NotifSender } from '../notif-sender/notif-sender';
import { NotificationTypes } from '../notification-types/notification-types';
import HasID from '../../util/has-id/has-id';

export type Notification = HasID & {
	type: NotificationTypes;
	sender: NotifSender;
	reciever: string;
	unread: boolean;
	createdAt: Date | Timestamp;
};
