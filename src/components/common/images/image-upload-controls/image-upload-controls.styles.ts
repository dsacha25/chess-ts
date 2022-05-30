import styled from 'styled-components';
import CustomButton from '../../buttons/custom-button/custom-button.component';
import { ImageUploadControlsProps } from './types';

export const UploadControlsContainer = styled.div<
	Pick<ImageUploadControlsProps, 'hover'>
>`
	display: ${({ hover }) => (hover ? 'grid' : 'none')};
	position: absolute;
	width: 95%;
	height: 95%;
	padding: 30px 0;

	place-items: center;

	background-color: ${({ theme }) => theme.light}80;

	z-index: 2;
`;

export const HiddenInput = styled.input`
	display: none;
`;

interface ImageControlsButtonProps {
	error?: string;
}

export const ImageControlsButton = styled(
	CustomButton
)<ImageControlsButtonProps>`
	display: ${({ error }) => error && 'none'};
	width: 80%;
	height: 40px;
	color: white;
	// border-color: white;
	// border-width: 4px;
	margin: 0;
	z-index: 3;
`;
