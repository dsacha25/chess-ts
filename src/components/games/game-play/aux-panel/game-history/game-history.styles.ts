import styled from 'styled-components';

export const GameHistoryList = styled.div`
	height: 100%;
	width: 95%;
	place-self: center;
	margin: 0;
	padding: 0;
	font-size: 12px;
`;

export const HistoryMove = styled.li`
	display: grid;
	width: 100%;
	height: 28px;
	grid-template-columns: 40px 1fr 1fr;

	margin: 6px 0;
	border: 1px solid grey;
	border-radius: 14px;
	padding: 3px;
	place-items: center;
	place-content: center;

	background-color: ${({ theme }) => theme.white}aa;
`;

export const MoveNumber = styled.p`
	font-weight: 600;
`;

export const WhiteMove = styled.p`
	font-weight: 600;
	border-left: 1px solid grey;
	width: 100%;
`;

export const BlackMove = styled.p`
	font-weight: 600;
	border-left: 1px solid grey;
	width: 100%;
`;
