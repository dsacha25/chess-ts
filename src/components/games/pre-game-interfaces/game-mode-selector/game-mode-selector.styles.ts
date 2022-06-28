import styled from 'styled-components';
import { StarBorderFilled } from '../../../common/border-styles/border-styles';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';

export const GameTypeSelectorContainer = styled.div`
	display: grid;
	/* grid-template-columns: repeat(3, 1fr); */

	position: absolute;

	margin: auto;

	left: 0;
	right: 0;

	width: 30vw;
	/* height: 100%; */
	gap: 10px;
	padding-bottom: 20px;

	place-items: center;
	z-index: 10;

	${StarBorderFilled};
`;

export const ChallengeButton = styled(CustomButton)`
	width: 50%;
	height: 50px;
	border-radius: 0.4rem !important;
	margin: 0;
	place-content: center;
`;
