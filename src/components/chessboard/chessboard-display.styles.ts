import styled from 'styled-components';

export const BoardContainer = styled.div`
	display: grid;
	place-items: center;
	width: 500px;
	height: 100%;
	justify-self: center;

	grid-template-rows: auto 500px auto;
`;

export const OrientationDisplay = styled.h1`
	text-transform: capitalize;
	color: ${({ theme }) => theme.main};
	justify-self: flex-start;
`;

export const CustomButton = styled.button`
	height: 60px;
	width: 200px;
	border-radius: 30px;
	text-transform: uppercase;
	outline: none;
`;
