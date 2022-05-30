import styled from 'styled-components';
import Spinner from '../../../common/spinner/spinner.component';

interface BoardProps {
	size: number;
}

export const BoardContainer = styled.div<BoardProps>`
	display: grid;
	position: relative;
	place-items: center;
	justify-self: center;
	grid-gap: 5px;

	grid-template-rows: auto ${({ size }) => size}px auto;

	@media screen and (max-width: 980px) {
		justify-self: flex-start;
		/* margin-top: 20px; */
		overflow: hidden;
	}
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

	background-color: ${({ theme }) => theme.white}f9;

	place-content: center;
	position: absolute;

	border-radius: 30px;

	z-index: 5;
`;

export const LoadSpinner = styled(Spinner)`
	position: absolute;
	z-index: 5;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
`;
