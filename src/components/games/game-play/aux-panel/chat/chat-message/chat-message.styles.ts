import styled from 'styled-components';
import ImageContainer from '../../../../../common/containers/image-container/image-container.component';
import { ChatMessageProps } from './types';

export const MessageContainer = styled.div<Pick<ChatMessageProps, 'sender'>>`
	display: grid;
	width: 74%;

	grid-template-columns: ${({ sender }) =>
		sender ? 'auto 20px' : '20px auto'};
	grid-template-rows: 1fr auto;
	margin-left: ${({ sender }) => sender && 'auto'};
	gap: 5px;
`;

export const Messages = styled.div<Pick<ChatMessageProps, 'sender'>>`
	display: flex;
	flex-direction: column;
	align-items: ${({ sender }) => (!sender ? 'flex-start' : 'flex-end')};
	gap: 5px;
	grid-column: ${({ sender }) => (!sender ? '2 / 2' : '1 / 1')};
	grid-row: 1;
`;

export const Message = styled.p<Pick<ChatMessageProps, 'sender'>>`
	display: block;
	width: fit-content;
	font-size: 0.68rem;
	font-weight: 300;
	border-radius: 15px;
	color: white;
	align-items: center;
	justify-content: flex-end;
	background-color: ${({ theme, sender }) =>
		sender ? theme.main : `${theme.grey}`};
	flex: 0;
	margin: 0;
	padding: 8px 12px;

	text-align: left;
	white-space: pre-line;
`;

export const ChatAvatar = styled(ImageContainer)<
	Pick<ChatMessageProps, 'sender'>
>`
	width: 20px;
	height: 20px;
	border-radius: 10px;
	align-self: flex-end;
	grid-column: ${({ sender }) => !sender && '1 / 1'};
	grid-row: 1;
`;

export const MessageTime = styled.p<Pick<ChatMessageProps, 'sender'>>`
	font-size: 8px;
	place-self: ${({ sender }) => (!sender ? 'flex-start' : 'flex-end')};
	margin: 0;
	padding: 0 10px;
	grid-column: ${({ sender }) => (!sender ? '2 / 2' : '1 / 1')};
`;
