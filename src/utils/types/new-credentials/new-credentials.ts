import { Credentials } from '../credentials/credentials';

export interface NewCredentials extends Credentials {
	displayName: string;
	confirmPassword: string;
	photoURL?: string;
}
