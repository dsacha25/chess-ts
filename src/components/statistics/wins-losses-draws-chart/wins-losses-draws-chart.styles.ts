import styled from 'styled-components';

export const WinsLossesDrawsContainer = styled.div`
	display: grid;
	width: 70%;
	height: 100%;
	place-items: center;

	background-color: ${({ theme }) => theme.white};
	border-radius: 30px;
	padding: 40px;
`;
