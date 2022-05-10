import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import ChatMessage from '../chat-message/chat-message.component';
import {
	ChatForm,
	ChatInput,
	ChatMessages,
	GameChatContainer,
	SendMessageButton,
} from './game-chat.styles';

const GameChat = () => {
	const [message, setMessage] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setMessage('');
	};

	return (
		<GameChatContainer>
			<ChatMessages>
				<ChatMessage
					sender={true}
					messages={[
						'Fuck you',
						'Eat my entire ass. You stupid asshole fucker.',
					]}
					createdAt={new Date()}
				/>
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
