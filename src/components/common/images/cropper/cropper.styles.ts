import styled from 'styled-components';
import Cropper from 'react-easy-crop';
import CustomButton from '../../buttons/custom-button/custom-button.component';

export const ImageCropper = styled(Cropper)`
	width: 100%;
	height: 200px;
`;

export const CropButton = styled(CustomButton)`
	width: 80%;
	height: 40px;
	color: white;
	border-color: white;
	border-width: 4px;
	margin: 0;
	margin-top: 75%;
	z-index: 3;
`;
