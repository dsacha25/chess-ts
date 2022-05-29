import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import Title from '../../common/title/title.styles';

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

export const TabTitle = styled(Title)`
	@media screen and (max-width: 980px) {
		font-size: 25px !important;
		margin: 0 !important;

		width: 100vw;
		height: 60px !important;

		text-align: center;
		background-color: ${({ theme }) => theme.accentBright};
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

	border-radius: 30px;

	justify-content: space-between;
`;

export const ListsContainer = styled.div`
	display: flex;
	flex-direction: column;

	width: inherit;
	max-height: 63vh;

	overflow-y: scroll;

	@media screen and (max-width: 980px) {
		height: 100%;
		max-height: unset;
	}
`;
