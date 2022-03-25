import styled from 'styled-components';
import { NotifFlagProps } from './types';

export const NotificationFlag = styled.div<NotifFlagProps>`
	display: ${({ unread }) => (unread ? 'grid' : 'none')};

	width: 16px;
	height: 16px;
	border-radius: 8px;

	background-color: ${({ theme }) => theme.warn};
`;
