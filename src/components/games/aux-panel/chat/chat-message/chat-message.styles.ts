import styled from 'styled-components';
import ImageContainer from '../../../../common/containers/image-container/image-container.component';
import { ChatMessageProps } from './types';

export const MessageContainer = styled.div<Pick<ChatMessageProps, 'sender'>>`
	display: grid;
	width: 60%;

	grid-template-columns: ${({ sender }) =>
		sender ? 'auto 20px' : '20px auto'};
	grid-template-rows: 1fr auto;
	margin-left: ${({ sender }) => sender && 'auto'};
	gap: 5px;
`;

export const Messages = styled.div<Pick<ChatMessageProps, 'sender'>>`
	display: grid;
	place-content: ${({ sender }) => (!sender ? 'flex-start' : 'flex-end')};
	gap: 5px;
	grid-column: ${({ sender }) => (!sender ? '2 / 2' : '1 / 1')};
	grid-row: 1;
`;

export const Message = styled.p<Pick<ChatMessageProps, 'sender'>>`
	display: flex;
	width: auto;
	min-height: 20px;
	font-size: 10px;
	border-radius: 15px;
	color: white;
	align-items: center;
	justify-content: flex-end;
	background-color: ${({ theme, sender }) =>
		sender ? theme.main : theme.accent};
	flex: 0;
	margin: 0;
	padding: 5px 10px;

	text-align: ${({ sender }) => sender && 'right'};

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
	place-self: flex-end;
	margin: 0;
	padding-right: 10px;
	grid-column: ${({ sender }) => (!sender ? '2 / 2' : '1 / 1')};
`;
