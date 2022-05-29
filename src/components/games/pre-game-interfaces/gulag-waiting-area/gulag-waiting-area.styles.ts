import styled from 'styled-components';

export const GulagWaitingAreaContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	place-items: center;

	@media screen and (max-width: 980px) {
		grid-template-rows: 60px 1fr;
		width: 100vw;
		height: calc(100vh - 70px);
		gap: 40px;
		overflow-y: auto;
		overflow-x: hidden;
	}
`;

export const SearchingMessageContainer = styled.div`
	display: grid;

	width: 400px;
	height: 400px;
	place-items: center;

	grid-template-rows: 1fr 1fr;

	background-color: ${({ theme }) => theme.light};
	border-radius: 60px;
`;

export const SearchingMsg = styled.p`
	font-size: 24px;
	font-weight: 500;
	font-style: italic;
`;
