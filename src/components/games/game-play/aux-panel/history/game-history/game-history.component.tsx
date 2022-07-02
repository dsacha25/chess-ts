import { isEqual } from 'lodash';
import React, { FC, memo, useEffect, useRef } from 'react';
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
	// const movesRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	if (movesRef.current) {
	// 		movesRef.current.scrollTop = movesRef.current.scrollHeight;
	// 	}
	// }, [movesRef]);

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

const historyPropsAreEqual = (
	prevProps: GameHistoryProps,
	nextProps: GameHistoryProps
) => {
	return prevProps.history.length === nextProps.history.length;
};

export default memo(GameHistory, historyPropsAreEqual);
