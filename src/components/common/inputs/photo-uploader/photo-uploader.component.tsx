import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { photo } from '../../../../utils/classes/image/image';
import { BaseImage } from '../../../../utils/types/image-types/base-image/base-image';
import Cropper from '../../images/cropper/cropper.component';
import ImageUploadControls from '../../images/image-upload-controls/image-upload-controls.component';
import { PhotoDisplay, PhotoUploadContainer } from './photo-uploader.styles';
import { PhotoUploaderProps } from './types';
import DefualtPhoto from '../../../../assets/default-photo/DefaultPhoto.png';

const PhotoUploader: FC<PhotoUploaderProps> = (props) => {
	const [url, setURL] = useState<string>(DefualtPhoto);
	const [inputImage, setInputImage] = useState<BaseImage | null>(null);
	const [cropped, setCropped] = useState(false);
	const [hover, setHover] = useState(false);

	const handleCrop = (croppedImage: BaseImage) => {
		setInputImage(null);
		setCropped(true);
		setURL(croppedImage.image);
		// method to send result to form
		props.setValue(props.name, croppedImage, {
			shouldDirty: true,
			shouldTouch: true,
		});
		// set form back to normal if disabled
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (!files) return;

		if (files.length === 1) {
			const image = await photo.fileToBaseImage(files[0]);
			setInputImage(image);
		}
	};

	useEffect(() => {
		if (props.defaultPhoto) {
			props.setValue('url', props.defaultPhoto);
			setURL(props.defaultPhoto);
		}

		// eslint-disable-next-line
	}, [props.defaultPhoto]);

	return (
		<PhotoUploadContainer
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{inputImage ? (
				<Cropper inputImage={inputImage} handleCrop={handleCrop} />
			) : (
				<PhotoDisplay url={url} />
			)}
			<ImageUploadControls
				hover={hover}
				inputImage={inputImage}
				cropped={cropped}
				onChange={handleFileChange}
			/>
		</PhotoUploadContainer>
	);
};

export default PhotoUploader;
