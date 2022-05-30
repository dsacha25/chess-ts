import styled from 'styled-components';
import CustomButton from '../../../../../common/buttons/custom-button/custom-button.component';

export const HistoryControllerContainer = styled.div`
	display: grid;
	width: 100%;
	place-items: center;

	grid-template-columns: repeat(4, 1fr);

	border-top: 1px solid ${({ theme }) => theme.main}40;
	/* border-bottom: 1px solid ${({ theme }) => theme.main}; */
`;

export const HistoryNavButton = styled(CustomButton)`
	width: 100%;
	height: 48px;
	margin: 0;
	place-content: center;

	border-radius: unset;
	color: black;

	:hover {
		background-color: grey;
	}

	background-color: transparent;
`;
