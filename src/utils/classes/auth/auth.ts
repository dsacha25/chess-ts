import { NewCredentials } from '../../types/users/new-credentials/new-credentials';
import { ProfileTypes } from '../../types/users/profile-info/profile-info-types';

export interface Authentication<T> {
	createNewUser(credentials: NewCredentials): Promise<T>;
	logInUser(email: string, password: string): Promise<T>;
	logOutUser(): Promise<void>;
	deleteUser(): Promise<void>;
	onAuthChange(callback: (e: any) => void): any;
	updateUserProfile(profileInfo: ProfileTypes): Promise<void>;
}
