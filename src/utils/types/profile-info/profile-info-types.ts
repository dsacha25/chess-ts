import { BaseImage } from '../image-types/base-image/base-image';

export interface ProfileTypes {
	displayName?: string | null;
	photoURL?: string | null;
}

export interface UpdateProfileData {
	displayName?: string;
	photoURL?: BaseImage;
}
