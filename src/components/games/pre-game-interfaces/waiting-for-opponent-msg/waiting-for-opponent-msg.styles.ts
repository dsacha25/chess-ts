import styled from 'styled-components';
import { StarBorderFilled } from '../../../common/border-styles/border-styles';

export const WaitingPromptBackdrop = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: 100vh;
	position: absolute;

	margin: auto;

	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	z-index: 10;
	backdrop-filter: blur(6px);

	@media screen and (max-width: 980px) {
		position: fixed;
		width: 100vw;
		height: calc(100vh - 70px);
		margin: unset;
	}
`;

export const WaitingForOpponentContainer = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	place-items: center;
	width: 40%;
	min-width: 650px;
	height: 400px;
	/* position: absolute; */

	margin: auto;

	z-index: 10;

	${StarBorderFilled};

	@media screen and (max-width: 980px) {
		width: 90vw;
		min-width: unset;
		height: calc(80vh - 70px);

		h2 {
			font-size: 24px;
			white-space: normal;
			text-align: center;
		}
	}
`;
