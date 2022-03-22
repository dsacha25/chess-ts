import styled from 'styled-components';

export const PhotoUploadContainer = styled.div`
	display: grid;
	place-items: center;

	width: 220px;
	height: 220px;

	padding: 0;
	margin: 20px 0;

	border: 4px solid ${({ theme }) => theme.light};
	border-radius: 30px;
	background-color: ${({ theme }) => theme.light}e2;

	overflow: hidden;

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

	background-image: ${({ url }) => `url(${url})`};
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;
