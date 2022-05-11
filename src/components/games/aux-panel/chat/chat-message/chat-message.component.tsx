import { formatDistanceToNow, secondsToMilliseconds, toDate } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
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

	useEffect(() => {
		if (props.createdAt instanceof Timestamp) {
			setTime(new Date(secondsToMilliseconds(props.createdAt.seconds)));
		} else {
			setTime(new Date(props.createdAt));
		}

		// eslint-disable-next-line
	}, []);

	return (
		<MessageContainer sender={props.sender}>
			<Messages>
				{props.messages.map((message, i) => (
					<Message key={i}>{message}</Message>
				))}
			</Messages>
			<ChatAvatar url={props.photoURL} />
			<MessageTime>{formatDistanceToNow(time)}</MessageTime>
		</MessageContainer>
	);
};

export default ChatMessage;
