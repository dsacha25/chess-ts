import styled from 'styled-components';
import { NotifFlagProps } from './types';

export const NotificationFlag = styled.div<NotifFlagProps>`
	display: grid;

	width: 16px;
	height: 16px;
	border-radius: 8px;

	background-color: ${({ theme, unread }) => (unread ? theme.warn : 'none')};
`;
