import styled from 'styled-components';
import ImageContainer from '../../../../common/containers/image-container/image-container.component';
import { ChatMessageProps } from './types';

export const MessageContainer = styled.div<Pick<ChatMessageProps, 'sender'>>`
	display: grid;
	width: 60%;

	grid-template-columns: auto 20px;
	grid-template-rows: 1fr auto;
	margin-left: auto;
	gap: 5px;
`;

export const Messages = styled.div`
	display: flex;
	place-content: flex-end;
	flex-direction: column;
	gap: 5px;
`;

export const Message = styled.p`
	display: flex;
	width: auto;
	min-height: 20px;
	font-size: 10px;
	border-radius: 15px;
	color: white;
	align-items: center;
	background-color: ${({ theme }) => theme.main};

	margin: 0;
	padding: 2px 10px;
`;

export const ChatAvatar = styled(ImageContainer)`
	width: 20px;
	height: 20px;
	border-radius: 10px;
	align-self: flex-end;
`;

export const MessageTime = styled.p`
	font-size: 8px;
	place-self: flex-end;
	margin: 0;
	padding-right: 10px;
`;
