import styled from 'styled-components';

export const GameResultsByContainer = styled.div`
	display: grid;
	width: 80%;
	height: 100%;
	place-content: center;

	background-color: ${({ theme }) => theme.white};
	border-radius: 30px;
	padding: 40px;
	grid-template-columns: repeat(3, 300px);
`;
