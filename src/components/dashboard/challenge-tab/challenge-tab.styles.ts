import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const ChallengesContainer = styled.div`
	display: grid;

	grid-template-rows: auto auto auto auto 1fr;

	width: 100%;
	height: 100%;

	place-items: center;

	color: white;

	@media screen and (max-width: 980px) {
		width: 100vw;
		height: calc(100vh - 70px);
		overflow-y: auto;
		/* justify-content: flex-start; */

		h2 {
			font-size: 25px;
			margin: 10px;
		}
	}
`;



export const ButtonsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	place-items: center;

	grid-gap: 40px;

	@media screen and (max-width: 980px) {
		grid-gap: unset;
	}
`;

export const ChallengeButton = styled(CustomButton)`
	display: flex;
	width: auto;
	height: 60px;

	gap: 20px;

	font-size: 18px;

	border-radius: 0.5rem;

	justify-content: space-between;
`;

export const ChallengeLabel = styled.label`
	display: initial;
	@media screen and (max-width: 980px) {
		display: none;
	}
`;

export const ListsContainer = styled.div`
	display: flex;
	flex-direction: column;

	align-items: center;

	width: inherit;
	max-height: 63vh;

	overflow-y: scroll;

	@media screen and (max-width: 980px) {
		height: 100%;
		max-height: unset;
	}
`;
