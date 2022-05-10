import styled from 'styled-components';
import CustomButton from '../../../../common/buttons/custom-button/custom-button.component';

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

export const ChatForm = styled.form`
	display: grid;
	grid-template-columns: 1fr auto;
`;

export const ChatInput = styled.input`
	width: 100%;
	border: none;
	border-top: 2px solid grey;
	background-color: ${({ theme }) => theme.white}55;
	padding: 10px;
`;

export const SendMessageButton = styled(CustomButton)`
	width: 80px;
	height: 100%;
	margin: 0;
	padding: 0;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	font-size: 10px;
`;
