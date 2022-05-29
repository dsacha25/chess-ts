import styled from 'styled-components';
import ImageContainer from '../../common/containers/image-container/image-container.component';
import { AvatarChipProps } from './types';

export const AvatarChip = styled(ImageContainer)<AvatarChipProps>`
	width: ${({ size }) => (size ? size : '100px')};
	height: ${({ size }) => (size ? size : '100px')};
	border-radius: ${({ size }) => (size ? `${parseInt(size) / 2}px` : '50px')};
	z-index: 1;
	border: 2px solid ${({ theme }) => theme.main};
	background-color: ${({ theme }) => theme.main};
`;
