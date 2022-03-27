import RequestTypes from '../request-types/request-types';

export interface PendingRequest {
	enemyUID: string;
	type: RequestTypes;
}
