import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import { NotificationFlag } from '../notification-flag/notification-flag.styles';

export const NotificationButtonContainer = styled.div`
	display: grid;
	width: 50px;
	height: 50px;
	place-content: center;
	position: relative;

	border-radius: 25px;

	grid-column: 1 / 2;
	margin: 0;
	background-color: ${({ theme }) => theme.main};
	border: 2px solid ${({ theme }) => theme.main};

	color: ${({ theme }) => theme.white};

	:focus,
	:hover {
		background-color: ${({ theme }) => theme.light};
	}
`;

export const NotifButtonFlag = styled(NotificationFlag)`
	position: absolute;
	top: -4px;
	right: -4px;
	z-index: 1;
`;
