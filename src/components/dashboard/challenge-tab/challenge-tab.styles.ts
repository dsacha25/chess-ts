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
		/* height: 100vh; */
		width: 100vw;
		overflow-y: auto;
		place-content: center;
		h2 {
			font-size: 20px;
		}
	}
`;

export const ButtonsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	place-items: center;

	grid-gap: 40px;

	@media screen and (max-width: 980px) {
		grid-template: repeat(3, 1fr) / 1fr;
		grid-gap: unset;
	}
`;

export const ChallengeButton = styled(CustomButton)`
	width: 92%;
	height: 60px;

	font-size: 18px;

	border-radius: 30px;
`;

export const ListsContainer = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	max-height: 63vh;

	overflow-y: scroll;

	@media screen and (max-width: 980px) {
		height: calc(100% - 60px);
	}
`;
