import { NotifSender } from '../../../types/notif-sender/notif-sender';
import { NotificationTypes } from '../../../types/notification-types/notification-types';

const constructNotifMessage = (
	notifType: NotificationTypes,
	sender: NotifSender
): string => {
	switch (notifType) {
		case 'enemy_request':
			return `${sender.displayName} wants to be your enemy`;
		case 'game_invite':
			return `${sender.displayName} has challenged you to a game!`;
		case 'players_turn':
			return `It's your turn against ${sender.displayName}`;
		case 'request_accepted':
			return `${sender.displayName} is now your enemy!`;
		default:
			return 'New notification';
	}
};

export default constructNotifMessage;
