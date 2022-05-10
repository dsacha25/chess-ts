import { formatDistanceToNow } from 'date-fns';
import React, { FC, useState } from 'react';
import {
	ChatAvatar,
	Message,
	MessageContainer,
	Messages,
	MessageTime,
} from './chat-message.styles';
import { ChatMessageProps } from './types';

const ChatMessage: FC<ChatMessageProps> = (props) => {
	const [time, setTime] = useState(new Date());

	return (
		<MessageContainer sender={props.sender}>
			<Messages>
				{props.messages.map((message, i) => (
					<Message key={i}>{message}</Message>
				))}
			</Messages>
			<ChatAvatar />
			<MessageTime>{formatDistanceToNow(time)}</MessageTime>
		</MessageContainer>
	);
};

export default ChatMessage;
