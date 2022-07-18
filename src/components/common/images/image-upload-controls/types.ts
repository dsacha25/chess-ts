import { ChangeEvent } from 'react';
import { BaseImage } from '../../../../utils/types/util/base-image/base-image';

export interface ImageUploadControlsProps {
	hover: boolean;
	inputImage: BaseImage | null;
	cropped: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}
