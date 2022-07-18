import { BaseImage } from '../../util/base-image/base-image';

export interface UpdateCredentials {
	displayName?: string;
	email?: string;
	photoURL?: BaseImage;
}
