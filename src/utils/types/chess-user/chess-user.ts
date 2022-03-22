import { UserInfo } from 'firebase/auth';

export interface ChessUser extends UserInfo {
	rating?: number;
}
