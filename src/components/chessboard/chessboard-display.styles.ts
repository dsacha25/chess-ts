import styled from 'styled-components';

export const MainWindow = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: 100vh;
	background-color: ${({ theme }) => theme.main};
`;

export const BoardContainer = styled.div`
	display: grid;
	place-items: center;
	width: 400px;
	height: 100vh;

	grid-template-rows: auto 1fr 1fr;
`;

export const OrientationDisplay = styled.h1`
	text-transform: capitalize;
	color: ${({ theme }) => theme.light};
	justify-self: flex-start;
`;

export const CustomButton = styled.button`
	height: 60px;
	width: 200px;
	border-radius: 30px;
	text-transform: uppercase;
	outline: none;
`;
