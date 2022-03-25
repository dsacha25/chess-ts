import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const NotificationElement = styled.div`
	display: grid;
	width: 100%;
	height: 50px;
	place-items: center;

	grid-template-columns: 50px 1fr 50px;

	font-size: 9px;

	:hover {
		background-color: ${({ theme }) => theme.main}33;
	}
`;

export const DeleteNotifButton = styled(CustomButton)`
	width: 50px;
	height: 50px;

	border-radius: 25px;
	place-content: center;
	margin: 0;
`;
