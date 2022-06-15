import styled from 'styled-components';
import { StarBorderLeft } from '../../common/border-styles/border-styles';

export const GameToolbarContainer = styled.div`
	display: grid;
	place-items: center flex-start;
	height: 60%;
	grid-template-rows: repeat(6, 1fr);

	position: relative;
`;

export const AestheticBar = styled.div`
	width: 50px;
	height: 32%;
	min-height: 200px;

	top: 50px;
	left: 0px;

	border-radius: 0.5rem;
	z-index: 0;

	position: absolute;

	${StarBorderLeft};
`;
