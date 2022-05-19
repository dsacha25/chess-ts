import React, { FC } from 'react';
import HistoryController from '../history-controller/history-controller.component';
import {
	BlackMove,
	GameHistoryContainer,
	HistoryMove,
	HistoryMoveList,
	MoveNumber,
	WhiteMove,
} from './game-history.styles';
import { GameHistoryProps } from './types';

const GameHistory: FC<GameHistoryProps> = ({ history }) => {
	return (
		<GameHistoryContainer>
			<HistoryMoveList>
				{history.map((move, i) => (
					<HistoryMove key={i}>
						<MoveNumber>{i + 1}:</MoveNumber>
						<WhiteMove>W: {move[0].move}</WhiteMove>
						{move[1] && <BlackMove>B: {move[1].move}</BlackMove>}
					</HistoryMove>
				))}
			</HistoryMoveList>
			<HistoryController />
		</GameHistoryContainer>
	);
};

export default GameHistory;
