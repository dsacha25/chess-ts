import styled from 'styled-components';
import { StarBorderFilled } from '../../common/border-styles/border-styles';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const AiLevelSelectContainer = styled.div`
	display: grid;
	width: 100%;
	height: 90%;

	place-self: center;
	place-items: flex-start center;
	grid-template-rows: auto 1fr;

	h2 {
		font-size: 2.5rem;
	}

	@media screen and (max-width: 980px) {
		grid-template-rows: 60px 1fr;
		width: 100vw;
		height: calc(100vh - 70px);
		gap: 40px;
		overflow-y: auto;
		overflow-x: hidden;
	}
`;

export const AiLevelSelectOptions = styled.div`
	display: flex;
	width: 80%;
	/* grid-template: 1fr 1fr / 1fr 1fr 1fr; */

	place-items: center;
	place-self: center;

	${StarBorderFilled};

	/* background-color: ${({ theme }) => theme.light}; */

	border-radius: 40px;

	gap: 20px;

	padding: 30px;

	@media screen and (max-width: 980px) {
		place-content: space-between;
		height: auto;
		flex-direction: column;
		margin: auto;
		margin-bottom: 40px;
	}
`;

export const SelectAiLevelButton = styled(CustomButton)`
	display: flex;
	justify-content: space-evenly;
	width: 100%;
	height: 80px;
	font-size: 30px;
	margin: 0;
`;
