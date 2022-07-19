import { UserInfo } from 'firebase/auth';

export interface ChessUser extends UserInfo {
	readonly rating?: number;
	totalOppRatings: number;
	wins: number;
	draws: number;
	losses: number;
	online: boolean;
}
