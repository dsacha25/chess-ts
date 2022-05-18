import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const NotificationElement = styled.div`
	display: grid;
	width: 100%;
	place-items: center;

	grid-template-columns: 50px 1fr 50px;

	:hover {
		background-color: ${({ theme }) => theme.main}33;
		border-radius: 20px;
	}

	:active {
		background-color: ${({ theme }) => theme.main}77;
	}

	cursor: pointer;
`;

export const NotificationMessage = styled.p`
	font-size: 14px;
	justify-self: flex-start;
	letter-spacing: -0.075rem;
`;

export const DeleteNotifButton = styled(CustomButton)`
	width: 50px;
	height: 50px;

	border-radius: 25px;
	place-content: center;
	margin: 0;
`;
