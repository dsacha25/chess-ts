import RequestTypes from '../request-types/request-types';

export interface NotifSender {
	uid: string;
	displayName: string;
	type: RequestTypes;
}
