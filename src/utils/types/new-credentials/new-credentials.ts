import { Credentials } from '../credentials/credentials';
import { BaseImage } from '../image-types/base-image/base-image';

export interface NewCredentials extends Credentials {
	displayName: string;
	confirmPassword: string;
	photoURL?: BaseImage;
}
