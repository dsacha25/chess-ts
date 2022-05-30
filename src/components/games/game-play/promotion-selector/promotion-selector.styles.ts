import styled from 'styled-components';
import { StarBorderFilled } from '../../../common/border-styles/border-styles';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';

export const PromotionSelectorContainer = styled.div`
	display: grid;
	position: absolute;
	place-items: center stretch;

	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;

	width: 90%;
	height: 200px;
	gap: 10px;

	grid-template: auto 1fr / repeat(4, 1fr);

	${StarBorderFilled};

	h2 {
		grid-column: 1 / span 4;
		place-self: center;
		margin: 15px;
		font-weight: 400;

		font-size: 1.4rem;

		@media screen and (max-width: 1200px) {
			font-size: 1rem;
		}
	}

	z-index: 10;
`;

export const PromotionButton = styled(CustomButton)`
	height: 80px;

	border-radius: 0.5rem;
`;
