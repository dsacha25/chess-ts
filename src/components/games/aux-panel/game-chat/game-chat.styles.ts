import styled from 'styled-components';

export const GameChatContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	grid-template-rows: 1fr 40px;
`;

export const ChatMessages = styled.div`
	width: 100%;
	height: 100%;
	padding: 10px;
`;

export const ChatInput = styled.input`
	width: 100%;
	border: none;
	border-top: 2px solid grey;
	background-color: ${({ theme }) => theme.white}55;
	padding: 10px;
`;
