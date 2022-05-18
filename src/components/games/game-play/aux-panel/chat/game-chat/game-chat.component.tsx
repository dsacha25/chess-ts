import React, {
	ChangeEvent,
	FormEvent,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import useActions from '../../../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectChatUsers,
	selectGameChat,
} from '../../../../../../redux/game/game.selector';
import { selectUserUID } from '../../../../../../redux/user/user.selector';
import parseChatUserPhotoURL from '../../../../../../utils/helpers/parsers/parse-chat-user-photo-url/parse-chat-user-photo-url';
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
	const chatUsers = useSelector((state) => selectChatUsers(state));

	const buttonRef = useRef<HTMLButtonElement>(null);
	const messagesRef = useRef<HTMLDivElement>(null);

	const { sendChatMessageStart } = useActions();

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
		if (message === '') return;
		sendChatMessageStart(message);

		setMessage('');
	};

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
						photoURL={parseChatUserPhotoURL(chatMsg, chatUsers)}
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
