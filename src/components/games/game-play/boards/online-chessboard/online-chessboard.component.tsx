import React, { useEffect, useState } from 'react';

import { Square } from 'chess.js';
import OpponentChip from '../../../../chips/game-chips/opponent-chip/opponent-chip.component';
import PlayerChip from '../../../../chips/game-chips/player-chip/player-chip.component';
import ChessGame from '../../../../../utils/classes/chess-game/chess-game';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectFen,
	selectOrientation,
} from '../../../../../redux/game/game.selector';

import useWindowSize from '../../../../../hooks/use-window-size/use-window-size.hook';

import ChessboardBase from '../chessboard-base/chessboard-base.component';
import queryBoardSize from '../../../../../utils/helpers/screen/query-board-size';
import {
	BoardContainer,
	OpponentContainer,
	PlayerContainer,
} from '../board-styles/board-styles.styles';
const game = new ChessGame();

const OnlineChessboard = () => {
	const { width } = useWindowSize();

	const fen = useSelector((state) => selectFen(state));
	const orientation = useSelector((state) => selectOrientation(state));

	const { setFen, makePendingMove } = useActions();

	const [boardSize, setBoardSize] = useState(800);

	// ==== BOARD SIZE
	useEffect(() => {
		// USE WINDOW SIZE TO DEFINE BOARD SIZE
		setBoardSize(queryBoardSize(width));
	}, [width]);

	const makeMove = (from: Square, to: Square) => {
		console.log('FROM - TO: ', from, to);
		if (from === to) return;
		let chessMove = game.movePieceServer(fen, from, to);

		if (chessMove === null) return;

		console.log('CHESS MOVE', chessMove);
		if (chessMove.turn !== orientation) {
			setFen(chessMove.fen);
			makePendingMove({
				fen: chessMove.fen,
				move: chessMove.san,
				winner: game.getWinner(chessMove.fen),
				gameOver: game.isGameOver(chessMove.fen),
			});
		}
	};

	return (
		<BoardContainer size={boardSize}>
			<OpponentContainer>
				<OpponentChip />
			</OpponentContainer>

			<ChessboardBase
				makeMove={makeMove}
				fen={fen}
				playersTurn={game.getTurn(fen) === orientation}
				orientation={orientation}
			/>

			<PlayerContainer>
				<PlayerChip />
			</PlayerContainer>
		</BoardContainer>
	);
};

export default OnlineChessboard;
