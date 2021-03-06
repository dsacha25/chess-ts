import { BaseImage } from '../../../../utils/types/util/base-image/base-image';

export interface CropperProps {
	inputImage: BaseImage;
	handleCrop: (crop: BaseImage) => void;
}
