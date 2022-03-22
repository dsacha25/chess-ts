import React, { FC, Fragment, useState } from 'react';
import { Area, Point } from 'react-easy-crop/types';
import { photo } from '../../../../utils/classes/image/image';
import { BaseImage } from '../../../../utils/types/image-types/base-image/base-image';
import { CropButton, ImageCropper } from './cropper.styles';
import { CropperProps } from './types';

const Cropper: FC<CropperProps> = (props) => {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [croppedImage, setCroppedImage] = useState<BaseImage>(props.inputImage);
	// const [cropped, setCropped] = useState(false);

	const onCropComplete: (
		croppedArea: Area,
		croppedAreaPixels: Area
	) => void = async (croppedArea, croppedAreaPixels) => {
		const baseImage = await photo.getCroppedImage(
			props.inputImage,
			croppedAreaPixels
		);

		setCroppedImage(baseImage);
	};

	return (
		<Fragment>
			<ImageCropper
				image={props.inputImage.image}
				onCropComplete={onCropComplete}
				onCropChange={setCrop}
				crop={crop}
				zoom={1}
				aspect={1}
				style={{ containerStyle: { borderRadius: '26px' } }}
			/>
			<CropButton
				type="button"
				onClick={() => props.handleCrop(croppedImage)}
				inverted
			>
				Crop
			</CropButton>
		</Fragment>
	);
};

export default Cropper;
