import React, { CSSProperties, useEffect, useState } from 'react';
import {
	BoardContainer,
	CustomButton,
	MainWindow,
	OrientationDisplay,
} from './chessboard-display.styles';
import Chessboard, { Piece } from 'chessboardjsx';
import { ChessInstance, Square, Move } from 'chess.js';
import Orientation from '../../utils/types/orientation/orientation';
import getOrientation from '../../utils/helpers/orientation/get-orientation';
const Chess = require('chess.js');
const game: ChessInstance = new Chess();

const ChessboardDisplay = () => {
	const [fen, setFen] = useState('start');
	const [dropStyles, setDropStyles] = useState({});
	const [squareStyles, setSquareStyles] = useState<{
		[square in Square]?: CSSProperties;
	}>({});
	const [pieceSquare, setPieceSquare] = useState<Square>();
	const [square, setSquare] = useState<Square>();
	const [history, setHistory] = useState<Move[]>([]);
	const [gameOver, setGameOver] = useState(game.game_over());

	const [orientation, setOrientation] = useState<Orientation>('white');

	const handleReset = () => {
		game.reset();
		setFen(game.fen());
		setSquareStyles({});
	};

	useEffect(() => {
		setGameOver(game.game_over());
		console.log('GAME OVER?: ', gameOver);

		// eslint-disable-next-line
	}, [fen]);

	const squareStyling = (pieceSquare: Square | undefined, history: Move[]) => {
		const sourceSquare = history.length && history[history.length - 1].from;
		const targetSquare = history.length && history[history.length - 1].to;

		const backgroundColor = 'rgba(255, 255, 0, 0.4)';

		return {
			[pieceSquare ? pieceSquare : '']: { backgroundColor },
			...(history.length && {
				[sourceSquare]: {
					backgroundColor,
				},
			}),
			...(history.length && {
				[targetSquare]: {
					backgroundColor,
				},
			}),
		};
	};

	const highlightSquare = (
		sourceSquare: Square,
		squaresToHighlight: Square[]
	) => {
		const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
			(a, c) => {
				return {
					...a,
					...{
						[c]: {
							background:
								'radial-gradient(circle, #fffc00 36%, transparent 40%)',
							borderRadius: '50%',
						},
					},
					...squareStyling(square, history),
				};
			},
			{}
		);

		setSquareStyles({ ...squareStyles, ...highlightStyles });
	};

	const removeHighlightSquare = () => {
		setSquareStyles(squareStyling(pieceSquare, history));
	};

	const onMouseOverSquare = (square: Square) => {
		// console.log('MOUSE OVER: ', square);
		setPieceSquare(square);

		// get list of possible moves for this square
		let moves = game.moves({
			square: square,
			verbose: true,
		});

		// return if no moves available
		if (moves.length === 0) return;

		let squaresToHighlight: Square[] = [];

		for (let i = 0; i < moves.length; i++) {
			squaresToHighlight.push(moves[i].to);
		}

		highlightSquare(square, squaresToHighlight);
	};

	const onMouseOutSquare = () => {
		removeHighlightSquare();
	};

	const onDrop = (props: { sourceSquare: Square; targetSquare: Square }) => {
		// console.log('DROP');

		const { sourceSquare, targetSquare } = props;

		let move = game.move({
			from: sourceSquare,
			to: targetSquare,
			promotion: 'q',
		});

		if (move === null) return;
		console.log('MOVE: ', move);

		setFen(game.fen());
		setHistory(game.history({ verbose: true }));
		setSquareStyles(squareStyling(pieceSquare, history));
		setOrientation(getOrientation(game.turn()));
	};

	const onDragOverSquare = () => {
		//
	};

	const onSquareClick = (square: Square) => {
		console.log('SQUARE CLICK: ', pieceSquare);

		setSquareStyles(squareStyling(square, history));
		setPieceSquare(square);

		let move = game.move({
			from: pieceSquare ? pieceSquare : square,
			to: square,
			promotion: 'q',
		});

		if (move === null) return;

		console.log('move: ', move);
		setFen(game.fen());
		setHistory(game.history({ verbose: true }));
		setPieceSquare(undefined);
		console.log('SQUARE CLICK END: ', pieceSquare);
	};

	const onPieceClick = (piece: Piece) => {
		console.log('PIECE CLICK: ', piece);
	};

	return (
		<MainWindow>
			<BoardContainer>
				<OrientationDisplay>
					Turn: {getOrientation(game.turn())}
				</OrientationDisplay>
				<Chessboard
					draggable
					position={fen}
					onMouseOverSquare={onMouseOverSquare}
					onMouseOutSquare={onMouseOutSquare}
					onDragOverSquare={onDragOverSquare}
					onSquareClick={onSquareClick}
					onPieceClick={onPieceClick}
					onDrop={onDrop}
					squareStyles={squareStyles}
					dropSquareStyle={dropStyles}
					orientation={orientation}
				/>
				{gameOver && (
					<div>
						<h1 style={{ color: 'white' }}>GAME OVER</h1>

						<CustomButton onClick={handleReset}>Reset Game</CustomButton>
					</div>
				)}
			</BoardContainer>
		</MainWindow>
	);
};

export default ChessboardDisplay;
