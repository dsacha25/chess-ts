import React, { FC } from 'react';
import {
	BlackMove,
	GameHistoryList,
	HistoryMove,
	MoveNumber,
	WhiteMove,
} from './game-history.styles';
import { GameHistoryProps } from './types';

const GameHistory: FC<GameHistoryProps> = ({ history }) => {
	return (
		<GameHistoryList>
			{history.map((move, i) => (
				<HistoryMove key={i}>
					<MoveNumber>{i + 1}:</MoveNumber>
					<WhiteMove>W: {move[0]}</WhiteMove>
					<BlackMove>B: {move[1]}</BlackMove>
				</HistoryMove>
			))}
		</GameHistoryList>
	);
};

export default GameHistory;
