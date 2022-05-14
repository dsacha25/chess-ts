import React, {
	ChangeEvent,
	createRef,
	FormEvent,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useForm } from 'react-hook-form';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectGameChat } from '../../../../../redux/game/game.selector';
import { selectUserUID } from '../../../../../redux/user/user.selector';
import CustomButton from '../../../../common/buttons/custom-button/custom-button.component';
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

	const buttonRef = useRef<HTMLButtonElement>(null);
	const messagesRef = useRef<HTMLDivElement>(null);

	const { sendChatMessageStart, openChatListenerStart } = useActions();

	const [message, setMessage] = useState('');
	const [inputEnabled, setInputEnabled] = useState(true);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (e.nativeEvent.type === 'insertLineBreak') {
			console.log('Line break');
		}

		if (inputEnabled) {
			setMessage(e.target.value);
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		setInputEnabled(true);
		if (e.key === 'Enter' && !e.shiftKey) {
			setInputEnabled(false);

			if (buttonRef.current) {
				buttonRef.current.click();
				setMessage('');
			}
		}

		if (e.key === 'Enter' && e.shiftKey) {
			console.log('Shift + Enter');
			setInputEnabled(true);
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		sendChatMessageStart(message);

		setMessage('');
	};

	useEffect(() => {
		openChatListenerStart();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (messagesRef.current) {
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
		}
	}, [messagesRef]);

	return (
		<GameChatContainer>
			<ChatMessages ref={messagesRef}>
				{chat.map((chatMsg, i) => (
					<ChatMessage
						key={i}
						sender={uid === chatMsg.uid}
						messages={chatMsg.message}
						createdAt={chatMsg.createdAt}
						photoURL={chatMsg.photoURL}
					/>
				))}
			</ChatMessages>
			<ChatForm onSubmit={handleSubmit}>
				<ChatInput
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					value={message}
					placeholder="Call them a bitch..."
					maxLength={160}
				/>
				<SendMessageButton type="submit" color="light" ref={buttonRef}>
					Send
				</SendMessageButton>
			</ChatForm>
		</GameChatContainer>
	);
};

export default GameChat;
