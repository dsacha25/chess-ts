import {
	format,
	formatDistanceToNow,
	isToday,
	secondsToMilliseconds,
	toDate,
} from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import formatTimestamp from '../../../../../utils/helpers/strings/format-timestamp/format-timestamp';
import {
	ChatAvatar,
	Message,
	MessageContainer,
	Messages,
	MessageTime,
} from './chat-message.styles';
import { ChatMessageProps } from './types';

const ChatMessage: FC<ChatMessageProps> = (props) => {
	const [time, setTime] = useState(formatDistanceToNow(new Date()));

	useEffect(() => {
		setTime(formatTimestamp(props.createdAt, 'MM/dd/yy - HH:mmaaa'));

		// eslint-disable-next-line
	}, [time]);

	return (
		<MessageContainer sender={props.sender}>
			<Messages sender={props.sender}>
				{props.messages.map((message, i) => (
					<Message sender={props.sender} key={i}>
						{message}
					</Message>
				))}
			</Messages>
			<ChatAvatar url={props.photoURL} sender={props.sender} />
			<MessageTime sender={props.sender}>{time}</MessageTime>
		</MessageContainer>
	);
};

export default ChatMessage;
