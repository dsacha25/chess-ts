import { BaseImage } from '../image-types/base-image/base-image';

export interface UpdateCredentials {
	displayName?: string;
	email?: string;
	photoURL?: BaseImage;
}
