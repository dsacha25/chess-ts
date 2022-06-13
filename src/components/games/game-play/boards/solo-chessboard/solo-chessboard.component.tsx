import React, { useEffect, useState } from 'react';
import useWindowSize from '../../../../../hooks/use-window-size/use-window-size.hook';
import { BoardContainer } from '../board-styles/board-styles.styles';

const SoloChessboard = () => {
	const { width } = useWindowSize();
	const [boardSize, setBoardSize] = useState(800);

	useEffect(() => {
		// IF MOBILE VIEW
		//// SET SIZE TO WINDOW WIDTH - PADDING
		if (width > 1500) {
			setBoardSize(800);
		}
		if (width <= 1500 && width > 1300) {
			setBoardSize(700);
		}
		if (width <= 1300 && width > 980) {
			setBoardSize(500);
		}
		if (width <= 980 && width > 300) {
			setBoardSize(width - 20);
		}
	}, [width]);

	return <BoardContainer size={boardSize}>SoloChessboard</BoardContainer>;
};

export default SoloChessboard;
