import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectGameChat } from '../../../../../redux/game/game.selector';
import { selectUserUID } from '../../../../../redux/user/user.selector';
import ChatMessage from '../chat-message/chat-message.component';
import {
	ChatForm,
	ChatInput,
	ChatMessages,
	GameChatContainer,
	SendMessageButton,
} from './game-chat.styles';

const GameChat = () => {
	const chat = useSelector((state) => selectGameChat(state));
	const uid = useSelector((state) => selectUserUID(state));

	const { sendChatMessageStart } = useActions();

	const [message, setMessage] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		sendChatMessageStart(message);

		setMessage('');
	};

	return (
		<GameChatContainer>
			<ChatMessages>
				{chat.map((chatMsg, i) => (
					<ChatMessage
						key={i}
						sender={uid === chatMsg.uid}
						messages={[chatMsg.message]}
						createdAt={chatMsg.createdAt}
						photoURL={chatMsg.photoURL}
					/>
				))}
			</ChatMessages>
			<ChatForm onSubmit={handleSubmit}>
				<ChatInput
					onChange={handleChange}
					value={message}
					placeholder="Call them a bitch..."
				/>
				<SendMessageButton color="light">Send</SendMessageButton>
			</ChatForm>
		</GameChatContainer>
	);
};

export default GameChat;
