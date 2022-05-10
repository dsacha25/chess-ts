import React from 'react';
import { ChatInput, ChatMessages, GameChatContainer } from './game-chat.styles';

const GameChat = () => {
	return (
		<GameChatContainer>
			<ChatMessages>Fuck you</ChatMessages>
			<ChatInput placeholder="Call them a bitch..." />
		</GameChatContainer>
	);
};

export default GameChat;
