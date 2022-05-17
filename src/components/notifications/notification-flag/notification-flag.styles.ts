import styled from 'styled-components';
import { NotifFlagProps } from './types';

export const NotificationFlag = styled.div<NotifFlagProps>`
	display: grid;

	width: 16px;
	height: 16px;
	border-radius: 8px;

	background-color: ${({ theme, unread }) => (unread ? theme.warn : 'none')};
`;

export const NotifButtonFlag = styled(NotificationFlag)`
	position: absolute;
	top: -4px;
	right: -4px;
	z-index: 1;
`;
