import styled from 'styled-components';

export const GameToolbarContainer = styled.div`
	display: grid;
	place-items: center flex-start;
	height: 60%;
	grid-template-rows: repeat(6, 1fr);

	position: relative;
`;

export const AestheticBar = styled.div`
	width: 50px;
	height: 50%;
	min-height: 200px;

	top: 50px;
	left: 10px;

	border-radius: 25px;
	z-index: 0;

	position: absolute;

	background-color: ${({ theme }) => theme.main}aa;
`;
