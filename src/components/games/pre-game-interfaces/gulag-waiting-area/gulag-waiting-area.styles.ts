import styled from 'styled-components';

export const GulagWaitingAreaContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	place-items: center;
	grid-template-rows: auto 1fr;

	@media screen and (max-width: 980px) {
		grid-template-rows: 60px 1fr;
		width: 100vw;
		height: calc(100vh - 70px);
		overflow-y: auto;
		overflow-x: hidden;
	}
`;

export const GulagContent = styled.div`
	display: flex;
	width: 100%;
	height: 100%;

	align-items: center;
	justify-content: center;
`;

export const SearchingMessageContainer = styled.div`
	display: grid;

	width: 60%;
	height: 40%;
	place-content: center;
	place-items: center;
	place-self: flex-start;

	grid-template-rows: auto 1fr;

	background-color: ${({ theme }) => theme.white};
	border-radius: 60px;

	@media screen and (max-width: 980px) {
		width: 100vw;
		height: 100%;
		border-radius: 0;
		padding: 10px;

		grid-template-rows: 100px 100px;
	}
`;

export const SearchingMsg = styled.p`
	font-size: 1.4rem;
	font-weight: 300;
	font-style: italic;
	margin: 20px 5px;
	color: ${({ theme }) => theme.main};

	text-transform: uppercase;

	@media screen and (max-width: 980px) {
		font-size: 0.83rem;
		text-align: center;
		place-self: center;
	}
`;
