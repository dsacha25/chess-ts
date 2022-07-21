import styled from 'styled-components';
import { StarBorderFilled } from '../../common/border-styles/border-styles';

export const StatsContainer = styled.div`
	display: grid;
	width: 80%;
	height: 100%;
	place-items: center;

	padding: 40px;

	box-shadow: 0 10px 29px -5px rgba(9, 30, 59, 0.5);
	-webkit-box-shadow: 0 10px 20px -5px rgba(9, 30, 59, 0.5);

	${StarBorderFilled};
`;
