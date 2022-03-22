import { UserInfo } from 'firebase/auth';

export interface Customer extends UserInfo {
	id: string;
	emailVerifySent?: boolean;
	initialSignUp?: boolean;
	sub_UID?: string;
}
