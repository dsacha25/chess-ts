import { User } from 'firebase/auth';
import { NewCredentials } from '../../types/new-credentials/new-credentials';
import { ProfileTypes } from '../../types/profile-info/profile-info-types';

export interface Authentication<T> {
	createNewUser(credentials: NewCredentials): Promise<T>;
	logInUser(email: string, password: string): Promise<T>;
	logOutUser(): Promise<void>;
	deleteUser(): Promise<void>;
	onAuthChange(callback: (e: any) => void): any;
	updateUserProfile(profileInfo: ProfileTypes): Promise<void>;
}
