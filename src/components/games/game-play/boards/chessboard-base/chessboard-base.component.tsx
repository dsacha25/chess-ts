import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Square } from 'chess.js';
import Chessboard, { Piece } from 'chessboardjsx';
import React, { FC, Fragment, useEffect, useState } from 'react';
import globalStyles from '../../../../../global-styles/global-styles';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import useWindowSize from '../../../../../hooks/use-window-size/use-window-size.hook';

import {
	selectGameType,
	selectPromotionPieceType,
} from '../../../../../redux/game/game.selector';
import ChessGame from '../../../../../utils/classes/chess-game/chess-game';
import isPromoting from '../../../../../utils/helpers/is-promoting/is-promoting';
import queryBoardSize from '../../../../../utils/helpers/screen/query-board-size';
import { GameOverDisplay } from '../../game-over-display/game-over-display.component';
import PromotionSelector from '../../promotion-selector/promotion-selector.component';
import { ChessboardBaseProps } from './types';
const game = new ChessGame();

const ChessboardBase: FC<ChessboardBaseProps> = ({
	makeMove,
	fen,
	playersTurn,
	orientation,
}) => {
	// ==== HOOK
	const { width } = useWindowSize();
	const { clearPromotionPieceType, setFen, movePiece, makePendingMove } =
		useActions();

	// ==== REDUX STATE
	const promotionType = useSelector((state) => selectPromotionPieceType(state));
	const gameType = useSelector((state) => selectGameType(state));

	// ==== LOCAL STATE
	const [boardSize, setBoardSize] = useState(800);
	const [storedMove, setStoredMove] = useState<{
		from: Square;
		to: Square;
	} | null>(null);
	const [squareStyles, setSquareStyles] = useState<{
		[square in Square]?: CSSProperties;
	}>({});
	// SQUARE THAT WAS SELECTED - USED FOR STYLING
	const [startSquare, setStartSquare] = useState<Square>();
	const [promoting, setPromoting] = useState(false);
	const [storedPiece, setStoredPiece] = useState<Piece>('wP');
	const [gameOver, setGameOver] = useState(false);

	// ==== BOARD SIZE
	useEffect(() => {
		// USE WINDOW SIZE TO DEFINE BOARD SIZE
		setBoardSize(queryBoardSize(width));
	}, [width]);

	// ==== PIECE PROMOTION
	useEffect(() => {
		if (!promoting || !promotionType || !storedMove) return;

		setStoredMove(null);
		clearPromotionPieceType();
		setPromoting(false);

		const chessMove = game.movePieceServer(
			fen,
			storedMove.from,
			storedMove.to,
			promotionType
		);

		if (chessMove) {
			setFen(chessMove.fen);

			if (gameType === 'online') {
				makePendingMove({
					fen: chessMove.fen,
					move: chessMove.san,
					winner: chessMove.winner,
				});
			} else {
				movePiece({ move: chessMove.san, fen: chessMove.fen });
			}
		}

		// eslint-disable-next-line
	}, [promoting, promotionType, storedMove]);

	// ==== STYLING
	useEffect(() => {
		if (startSquare && playersTurn) {
			const moves = game.getMovesToHighlight(fen, startSquare);
			if (moves && moves.length > 0) {
				const highlightStyles = game.highlightSquare(fen, startSquare, moves);
				setSquareStyles({ ...squareStyles, ...highlightStyles });
			}
		} else {
			setSquareStyles(game.squareStyling(fen, startSquare));
		}

		// eslint-disable-next-line
	}, [startSquare]);

	// ==== GAME OVER STATE
	useEffect(() => {
		setGameOver(game.isGameOver(fen));

		if (game.isGameOver(fen)) {
			console.log('WINNER: ', game.getWinner(fen));

			// UPDATE FIREBASE
		}

		// eslint-disable-next-line
	}, [fen]);

	const handleMouseOverSquare = (square: Square) => {
		// IF NOT PLAYERS TURN DO NOTHING
		if (!playersTurn) return;
		// HIGHLIGHT SQUARES
		const movesToHighlight = game.getMovesToHighlight(fen, square);

		// return if no moves available
		if (!movesToHighlight || movesToHighlight.length === 0) return;

		const highlightStyles = game.highlightSquare(fen, square, movesToHighlight);

		setSquareStyles({ ...squareStyles, ...highlightStyles });
	};

	const handleMouseOutSquare = () => {
		setSquareStyles(game.squareStyling(fen, startSquare));
	};

	const handlePieceClick = (piece: Piece) => {
		setStoredPiece(piece);
	};

	const handleSquareClick = (square: Square) => {
		setStartSquare(square);
		setSquareStyles(game.squareStyling(fen, square));
		console.log('SQUARE: ', startSquare);

		const piecePromoting = isPromoting(square[1], storedPiece);

		if (startSquare && startSquare !== square) {
			if (piecePromoting) {
				// SHOW PROMOTION SELECTOR & STORE MOVE
				setPromoting(true);
				setStoredMove({ from: startSquare, to: square });
			} else {
				// MAKE MOVE & CLEAR START SQUARE
				makeMove(startSquare, square);
			}
			setSquareStyles(game.squareStyling(fen, startSquare));
			setStartSquare(undefined);
		}
	};

	const handleDrop = (props: {
		sourceSquare: Square;
		targetSquare: Square;
		piece: Piece;
	}) => {
		const { sourceSquare, targetSquare, piece } = props;

		// CLEAR SELECTION STYLES
		setStartSquare(undefined);
		// IF SAME SQUARE DO NOTHING
		if (sourceSquare === targetSquare) return;

		const piecePromoting = isPromoting(targetSquare[1], piece);

		if (piecePromoting) {
			// SHOW PROMOTION SELECTOR & STORE MOVE
			setPromoting(true);
			setStoredMove({ from: sourceSquare, to: targetSquare });
		} else {
			// MAKE MOVE & CLEAR SELECTION
			makeMove(sourceSquare, targetSquare);
			setSquareStyles({});
		}
	};

	return (
		<Fragment>
			<Chessboard
				draggable
				position={fen}
				orientation={orientation}
				width={boardSize}
				squareStyles={squareStyles}
				lightSquareStyle={{ backgroundColor: globalStyles.white }}
				darkSquareStyle={{ backgroundColor: globalStyles.accent }}
				onMouseOverSquare={handleMouseOverSquare}
				onMouseOutSquare={handleMouseOutSquare}
				onSquareClick={handleSquareClick}
				onPieceClick={handlePieceClick}
				onDrop={handleDrop}
			/>
			{promoting && <PromotionSelector />}
			{gameOver && <GameOverDisplay />}
		</Fragment>
	);
};

export default ChessboardBase;
