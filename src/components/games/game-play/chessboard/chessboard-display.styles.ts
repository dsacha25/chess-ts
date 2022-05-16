import styled from 'styled-components';

export const BoardContainer = styled.div`
	display: grid;
	position: relative;
	place-items: center;
	/* width: 700px; */
	/* height: 100%; */
	justify-self: center;
	grid-gap: 5px;

	grid-template-rows: auto 600px auto;
`;

export const CustomButton = styled.button`
	height: 60px;
	width: 200px;
	border-radius: 30px;
	text-transform: uppercase;
	outline: none;
`;

export const OpponentContainer = styled.div`
	display: grid;
	width: 100%;
	height: 60px;
	place-items: flex-end flex-start;
`;

export const PlayerContainer = styled.div`
	display: grid;
	width: 100%;
	height: 60px;
	place-items: flex-start flex-end;
`;

export const GameOverDisplay = styled.div`
	display: grid;

	width: 90%;
	height: 250px;

	background-color: ${({ theme }) => theme.white}ee;

	place-content: center;
	position: absolute;

	border-radius: 30px;
`;
