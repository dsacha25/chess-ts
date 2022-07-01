import styled from 'styled-components';
import { StarBorderFilled } from '../../../common/border-styles/border-styles';

export const WaitingForOpponentContainer = styled.div`
	display: grid;
	grid-template-rows: auto 1fr;
	place-items: center;
	width: 50%;
	height: 300px;
	position: absolute;

	margin: auto;

	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	z-index: 10;

	${StarBorderFilled};
`;
