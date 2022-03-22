import { BaseImage } from '../../../../utils/types/image-types/base-image/base-image';

export interface CropperProps {
	inputImage: BaseImage;
	handleCrop: (crop: BaseImage) => void;
}
