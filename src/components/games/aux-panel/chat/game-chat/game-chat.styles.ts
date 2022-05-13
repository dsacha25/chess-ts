import styled from 'styled-components';
import CustomButton from '../../../../common/buttons/custom-button/custom-button.component';

export const GameChatContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	overflow-y: hidden;

	grid-template-rows: 1fr 40px;
`;

export const ChatMessages = styled.div`
	width: 100%;
	height: 100%;
	padding: 10px;

	overflow-y: scroll;
`;

export const ChatForm = styled.form`
	display: grid;
	grid-template-columns: 1fr auto;
`;

export const ChatInput = styled.textarea`
	width: 100%;
	border: none;
	border-top: 2px solid grey;
	background-color: ${({ theme }) => theme.white}cc;
	padding: 10px;

	font-family: 'Lexend Peta', sans-serif;
	font-weight: 300;
	font-size: 10px;

	max-width: 260px;

	resize: none;
	outline: none;
`;

export const SendMessageButton = styled.button`
	width: 80px;
	height: 100%;
	margin: 0;
	padding: 0;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	border-bottom-left-radius: 0;
	font-size: 10px;

	border-top: 2px solid grey;
`;
