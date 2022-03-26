import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const NotificationElement = styled.div`
	display: grid;
	width: 100%;
	height: 50px;
	place-items: center;

	grid-template-columns: 50px 1fr 50px;

	:hover {
		background-color: ${({ theme }) => theme.main}33;
	}

	:active {
		background-color: ${({ theme }) => theme.main}77;
	}

	cursor: pointer;
`;

export const NotificationMessage = styled.p`
	font-size: 9px;
	justify-self: flex-start;
`;

export const DeleteNotifButton = styled(CustomButton)`
	width: 50px;
	height: 50px;

	border-radius: 25px;
	place-content: center;
	margin: 0;
`;
