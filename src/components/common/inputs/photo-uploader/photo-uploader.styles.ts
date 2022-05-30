import styled from 'styled-components';
import { StarBorderFilled } from '../../border-styles/border-styles';

export const PhotoUploadContainer = styled.div`
	display: grid;
	place-items: center;

	width: 220px;
	height: 220px;

	padding: 10px;
	margin: 20px 0;

	${StarBorderFilled};

	/* border: 3px solid ${({ theme }) => theme.grey}; */
	/* border-radius: 30px; */
	/* background-color: ${({ theme }) => theme.grey}e2; */

	/* overflow: hidden; */

	position: relative;

	transition: all 1s ease;
`;

interface PhotoDisplayProps {
	url: string;
}

export const PhotoDisplay = styled.div<PhotoDisplayProps>`
	display: grid;
	width: 100%;
	height: 100%;

	z-index: 1;

	/* border-radius: 26px; */
	/* overflow: hidden; */

	background-image: ${({ url }) => `url(${url})`};
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;

export const PhotoLabel = styled.label`
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.grey};
	font-size: 18px;
	font-weight: 300;
	position: absolute;
	top: -14%;
	font-style: italic;
	letter-spacing: 0.05rem;
	pointer-events: none;
	transition: 300ms ease all;
	z-index: 5;

	&.shrink {
		display: unset;
		align-items: unset;
		top: -20px;
		font-size: 16px;
		font-weight: 600;
		color: ${({ theme }) => theme.main};
	}
`;
