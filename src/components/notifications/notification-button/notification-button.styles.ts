import styled, { css } from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import { NotificationFlag } from '../notification-flag/notification-flag.styles';
import { NotificationsContainer } from '../notifications-window/notifications-window.styles';
import { NotificationButtonProps } from './types';

const desktopContainerStyles = css`
	border-radius: 25px;

	grid-column: 1 / 2;
	margin: 0;
`;

const mobileContainerStyles = css`
	width: 100%;
	height: 100%;
	place-items: center;
	position: unset;

	${NotificationsContainer} {
		position: fixed;
		top: 0;
		left: 0;

		width: 100vw;
		height: calc(100vh - 70px);
		border-radius: 0;
		border: none;
		z-index: 10;
	}
`;

const queryContainerStyles = ({ mobile }: NotificationButtonProps) => {
	return mobile ? mobileContainerStyles : desktopContainerStyles;
};

export const NotificationButtonContainer = styled.div<NotificationButtonProps>`
	display: grid;
	position: relative;

	:focus,
	:hover {
		background-color: ${({ theme }) => theme.light};
	}

	${queryContainerStyles}
`;

const desktopButtonStyles = css`
	width: 50px;
	height: 50px;
	border-radius: 25px;
`;

const mobileButtonStyles = css`
	width: 100%;
	height: 100%;
	border-radius: 0px;
	padding: 0;

	color: ${({ theme }) => theme.main};

	${NotificationFlag} {
		top: 15%;
		left: 15%;
	}
`;

const queryButtonStyles = ({ mobile }: NotificationButtonProps) => {
	return mobile ? mobileButtonStyles : desktopButtonStyles;
};

export const NotifButton = styled(CustomButton)<NotificationButtonProps>`
	display: grid;

	place-content: center;

	margin: 0;

	${queryButtonStyles};
`;
