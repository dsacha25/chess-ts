import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const AiLevelSelectContainer = styled.div`
	display: grid;
	width: 100%;
	height: 60%;

	place-self: center;
	place-items: center;
`;

export const AiLevelSelectOptions = styled.div`
	display: flex;
	width: 80%;
	height: 80%;

	/* grid-template: 1fr 1fr / 1fr 1fr 1fr; */

	place-items: center;

	background-color: ${({ theme }) => theme.light};

	border-radius: 40px;

	gap: 20px;

	padding: 20px;
`;

export const SelectAiLevelButton = styled(CustomButton)`
	width: 100%;
	height: 80px;
	font-size: 30px;
	margin: 0;
`;
