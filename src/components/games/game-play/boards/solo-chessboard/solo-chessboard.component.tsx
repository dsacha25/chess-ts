import React, { useEffect, useState } from 'react';
import useWindowSize from '../../../../../hooks/use-window-size/use-window-size.hook';
import { BoardContainer } from '../board-styles/board-styles.styles';
import { Square } from 'chess.js';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import ChessGame from '../../../../../utils/classes/chess-game/chess-game';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectFen } from '../../../../../redux/game/game.selector';
import ChessboardBase from '../../boards/chessboard-base/chessboard-base.component';
import queryBoardSize from '../../../../../utils/helpers/screen/query-board-size';

const game = new ChessGame();

const SoloChessboard = () => {
	const { width } = useWindowSize();

	const [boardSize, setBoardSize] = useState(800);

	const { movePiece, setFen, setOrientation } = useActions();

	const fen = useSelector((state) => selectFen(state));

	const makeMove = (from: Square, to: Square) => {
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

	useEffect(() => {
		// USE WINDOW SIZE TO DEFINE BOARD SIZE
		setBoardSize(queryBoardSize(width));
	}, [width]);

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
