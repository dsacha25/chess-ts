import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const ChallengesContainer = styled.div`
	display: grid;

	grid-template-rows: auto auto auto auto 1fr;

	width: 100%;
	height: 100%;

	place-items: center;

	color: white;
`;

export const ButtonsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	place-items: center;

	grid-gap: 40px;
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
`;
