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
	height: 40px;
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

	background-color: ${({ theme }) => theme.light};
	border: none;
	border-top: 2px solid grey;

	border-bottom-right-radius: 20px;
	:focus,
	:hover {
		color: ${({ theme }) => theme.light} !important;
		background-color: white;
		border: 2px solid !important;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-bottom-left-radius: 0;
	}

	display: grid;
	place-items: center;

	height: 40px;

	margin: 0px;
	padding: auto;

	background: none;
	outline: none;

	cursor: pointer;

	transition: all 250ms ease;
	transform-origin: center;
	will-change: transform, font-weight;
	s :active {
		transform: scale(0.95);
	}

	/* FONT */
	font-family: 'Lexend Peta', sans-serif;
	text-transform: uppercase;

	font-size: 10px;
	font-weight: 600;
	letter-spacing: 0.1rem;
	white-space: nowrap;
`;
