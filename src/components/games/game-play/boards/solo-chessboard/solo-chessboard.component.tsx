import React, { useEffect, useState } from 'react';
import useWindowSize from '../../../../../hooks/use-window-size/use-window-size.hook';
import { BoardContainer } from '../board-styles/board-styles.styles';
import { Square } from 'chess.js';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import ChessGame from '../../../../../utils/classes/chess-game/chess-game';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectFen } from '../../../../../redux/game/game.selector';
import ChessboardBase from '../../boards/chessboard-base/chessboard-base.component';

const game = new ChessGame();

const SoloChessboard = () => {
	const { width } = useWindowSize();

	const [boardSize, setBoardSize] = useState(800);

	const { movePiece, setFen, setOrientation } = useActions();

	const fen = useSelector((state) => selectFen(state));

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

	const makeMove = (from: Square, to: Square) => {
		console.log('FROM - TO: ', from, to);
		if (from === to) return;
		let chessMove = game.movePieceServer(fen, from, to);

		if (chessMove === null) return;

		setFen(chessMove.fen);
		movePiece({ move: chessMove.san, fen: chessMove.fen });
		setTimeout(() => {
			if (chessMove === null) return;
			setOrientation(chessMove.turn);
		}, 500);
	};

	return (
		<BoardContainer size={boardSize}>
			<ChessboardBase
				makeMove={makeMove}
				fen={fen}
				playersTurn
				orientation="white"
			/>
		</BoardContainer>
	);
};

export default SoloChessboard;
