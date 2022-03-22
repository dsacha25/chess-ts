import React, { FC, useRef } from 'react';
import {
	HiddenInput,
	ImageControlsButton,
	UploadControlsContainer,
} from './image-upload-controls.styles';
import { ImageUploadControlsProps } from './types';

const ImageUploadControls: FC<ImageUploadControlsProps> = (props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleUpload = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleUpdateCrop = () => {
		//
	};

	return (
		<UploadControlsContainer hover={props.hover && !props.inputImage}>
			{props.cropped && (
				<ImageControlsButton type="button" onClick={handleUpdateCrop} inverted>
					Crop
				</ImageControlsButton>
			)}
			<HiddenInput
				type="file"
				accept="image/*"
				aria-label="image-input"
				ref={inputRef}
				onChange={props.onChange}
			/>
			<ImageControlsButton type="button" onClick={handleUpload} inverted>
				Upload
			</ImageControlsButton>
		</UploadControlsContainer>
	);
};

export default ImageUploadControls;
