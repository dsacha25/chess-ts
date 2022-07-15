import { FirebaseApp } from 'firebase/app';
import {
	Auth,
	createUserWithEmailAndPassword,
	deleteUser,
	getAuth,
	NextOrObserver,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	reauthenticateWithCredential,
	signOut,
	Unsubscribe,
	User,
	UserCredential,
	EmailAuthProvider,
	sendEmailVerification,
	sendPasswordResetEmail,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
	updateEmail,
} from 'firebase/auth';
import { ChessUser } from '../../types/chess-user/chess-user';
import { Credentials } from '../../types/credentials/credentials';
import { Customer } from '../../types/customer/customer';
import { NewCredentials } from '../../types/new-credentials/new-credentials';
import { ProfileTypes } from '../../types/profile-info/profile-info-types';
import { db } from '../firestore/firestore-app';
import { Authentication } from './auth';

export class FirebaseAuth implements Authentication<User> {
	private auth: Auth;

	constructor(app: FirebaseApp) {
		this.auth = getAuth(app);
	}

	get currentUser() {
		return this.auth.currentUser;
	}

	private getCredential(email: string, password: string) {
		return EmailAuthProvider.credential(email, password);
	}

	getCurrentUser(): Promise<User | null> {
		return new Promise((resolve, reject) => {
			const unsubscribe = this.auth.onAuthStateChanged((user) => {
				unsubscribe();
				resolve(user);
			}, reject);
		});
	}

	async createNewUser(newCredential: NewCredentials): Promise<User> {
		const credential = await createUserWithEmailAndPassword(
			this.auth,
			newCredential.email,
			newCredential.password
		);

		await updateProfile(credential.user, {
			displayName: newCredential.displayName,
		}).then(async () => {
			const newChessUser: ChessUser = {
				uid: credential.user.uid,
				displayName: credential.user.displayName,
				email: credential.user.email,
				photoURL: credential.user.photoURL,
				phoneNumber: credential.user.phoneNumber,
				providerId: credential.providerId || '',
				rating: 800,
				totalOppRating: 0,
				wins: 0,
				losses: 0,
				online: true,
			};
			await this.createUserDocument(newChessUser);
		});

		return credential.user;
	}

	async createUserDocument(user: ChessUser): Promise<void> {
		await db.create('users', user.uid, user);
	}

	async fetchUserDocument(uid: string): Promise<Customer | undefined> {
		const customer = await db.get<Customer>('customers', uid);
		if ((customer as Customer) && customer) {
			return customer;
		}
	}

	async updateEmailAddress(email: string) {
		const user = this.currentUser;
		if (user) {
			await updateEmail(user, email);
		}
	}

	updateUserProfile = async (credentials: ProfileTypes): Promise<void> => {
		const user = this.currentUser;

		if (user) {
			await updateProfile(user, credentials);

			if (credentials.displayName) {
				await db.update('users', user.uid, {
					displayName: credentials.displayName,
				});
			}
		}
	};

	logInUser = async (email: string, password: string): Promise<User> => {
		const credential = await signInWithEmailAndPassword(
			this.auth,
			email,
			password
		);
		return credential.user;
	};

	async googleSignIn(): Promise<User> {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({ prompt: 'select_account' });
		const credential = await signInWithPopup(this.auth, provider);
		return credential.user;
	}

	async reauthenticate({
		email,
		password,
	}: Credentials): Promise<UserCredential | undefined> {
		if (this.auth.currentUser) {
			const user = await reauthenticateWithCredential(
				this.auth.currentUser,
				this.getCredential(email, password)
			).then((credential) => {
				console.log(
					`${credential.user.email} was successfully reauthenticated.`
				);
				return credential;
			});
			return user;
		}
		return;
	}

	async resetPassword(email: string): Promise<void> {
		await sendPasswordResetEmail(this.auth, email);
	}

	async logOutUser(): Promise<void> {
		await signOut(this.auth);
	}

	async deleteUser(): Promise<void> {
		const user = this.auth.currentUser;
		if (user) await deleteUser(user);
		return;
	}

	onAuthChange(callback: NextOrObserver<User>): Unsubscribe {
		const unsubscribe = onAuthStateChanged(this.auth, callback);
		return unsubscribe;
	}

	async verifyEmail(): Promise<void> {
		const user = this.auth.currentUser;
		if (user && !user.emailVerified) {
			sendEmailVerification(user);
		}
	}
}
