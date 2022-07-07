import styled from 'styled-components';

export const ErrorBoundaryContainer = styled.div`
	display: grid;
	width: 100vw;
	height: 100vh;
	padding: 80px;

	grid-gap: 40px;
	position: relative;

	@media screen and (max-width: 980px) {
		grid-template-columns: unset;
		padding: 0;
		max-width: 100vw;
		height: 100%;
		overflow: hidden;
	}
`;

export const ErrorImageOverlay = styled.div`
	height: 60vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ErrorImageContainer = styled.div`
	display: inline-block;
	background-image: url('https://i.imgur.com/yW2W9SC.png');
	background-size: cover;
	width: 40vh;
	height: 40vh;
`;

export const ErrorImageText = styled.div`
	font-size: 28px;
	color: #2f8e89;
`;
