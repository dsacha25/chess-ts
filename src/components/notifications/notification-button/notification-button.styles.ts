import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import { NotificationButtonProps } from './types';

export const NotificationButtonContainer = styled(CustomButton)`
	display: grid;
	width: 50px;
	height: 50px;
	place-content: center;
	position: relative;

	border-radius: 25px;

	grid-column: 1 / 2;
	margin: 0;
`;

export const UnreadNotifFlag = styled.div<NotificationButtonProps>`
	display: ${({ hasUnreadNotifs }) => (hasUnreadNotifs ? 'grid' : 'none')};

	position: absolute;
	top: -4px;
	right: -4px;
	z-index: 1;

	width: 18px;
	height: 18px;
	border-radius: 9px;

	background-color: ${({ theme }) => theme.warn};
`;
