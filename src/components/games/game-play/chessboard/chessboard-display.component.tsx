import React, { useEffect, useState } from 'react';
import {
	BoardContainer,
	OpponentContainer,
	PlayerContainer,
} from './chessboard-display.styles';
import { Square } from 'chess.js';
import OpponentChip from '../../../chips/game-chips/opponent-chip/opponent-chip.component';
import PlayerChip from '../../../chips/game-chips/player-chip/player-chip.component';
import ChessGame from '../../../../utils/classes/chess-game/chess-game';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectFen,
	selectGameType,
	selectOrientation,
} from '../../../../redux/game/game.selector';

import useWindowSize from '../../../../hooks/use-window-size/use-window-size.hook';

import ChessboardBase from '../boards/chessboard-base/chessboard-base.component';
import queryBoardSize from '../../../../utils/helpers/screen/query-board-size';
const game = new ChessGame();

const ChessboardDisplay = () => {
	const { width } = useWindowSize();

	const gameType = useSelector((state) => selectGameType(state));
	const fen = useSelector((state) => selectFen(state));
	const orientation = useSelector((state) => selectOrientation(state));

	const { movePiece, setFen, setOrientation, makePendingMove } = useActions();

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

		if (gameType === 'online') {
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
		} else if (gameType === 'solo') {
			setFen(chessMove.fen);
			movePiece({ move: chessMove.san, fen: chessMove.fen });
			setTimeout(() => {
				if (chessMove === null) return;
				setOrientation(chessMove.turn);
			}, 500);
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

export default ChessboardDisplay;
