import Chessboard from 'chessboardjsx';
import React from 'react';
import { BoardContainer } from '../../chessboard/chessboard-display.styles';

const AiChessboard = () => {
	return (
		<BoardContainer size={700}>
			<Chessboard
				draggable
				position={'start'}
				orientation="white"
				width={700}
			/>
		</BoardContainer>
	);
};

export default AiChessboard;
