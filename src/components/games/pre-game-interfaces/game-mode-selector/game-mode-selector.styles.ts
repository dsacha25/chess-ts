import styled from 'styled-components';
import { StarBorderFilled } from '../../../common/border-styles/border-styles';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';

export const GameTypeSelectorContainer = styled.div`
	display: grid;
	position: absolute;
	margin: auto;

	left: 0;
	right: 0;

	width: 30vw;
	gap: 10px;
	padding-bottom: 20px;

	place-items: center;
	z-index: 10;

	${StarBorderFilled};

	@media screen and (max-width: 980px) {
		top: 8px;
		width: 96vw;

		h2 {
			font-size: 20px;
		}
	}
`;

export const ChallengeButton = styled(CustomButton)`
	width: 50%;
	height: 50px;
	border-radius: 0.4rem !important;
	margin: 0;
	place-content: center;

	@media screen and (max-width: 980px) {
		width: 60%;
	}
`;
