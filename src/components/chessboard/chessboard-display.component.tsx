import React, { CSSProperties, useEffect, useState } from 'react';
import {
	BoardContainer,
	OpponentContainer,
	PlayerContainer,
} from './chessboard-display.styles';
import Chessboard, { Piece } from 'chessboardjsx';
import { Square, Move } from 'chess.js';
import Orientation from '../../utils/types/orientation/orientation';
import OpponentChip from '../chips/game-chips/opponent-chip/opponent-chip.component';
import PlayerChip from '../chips/game-chips/player-chip/player-chip.component';
import ChessGame from '../../utils/classes/chess-game/chess-game';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectFen, selectGameType } from '../../redux/game/game.selector';
import { useLocation } from 'react-router-dom';
const game = new ChessGame();

const ChessboardDisplay = () => {
	const location = useLocation();

	const gameType = useSelector((state) => selectGameType(state));
	const fen = useSelector((state) => selectFen(state));
	const { movePiece, resetGame, setGameType, setFen } = useActions();

	const [dropStyles, setDropStyles] = useState({});
	const [squareStyles, setSquareStyles] = useState<{
		[square in Square]?: CSSProperties;
	}>({});
	const [pieceSquare, setPieceSquare] = useState<Square>();
	const [square, setSquare] = useState<Square>();
	const [history, setHistory] = useState<Move[]>([]);
	const [gameOver, setGameOver] = useState(game.isGameOver);

	const [orientation, setOrientation] = useState<Orientation>('white');

	const [playerSide, setPlayerSide] = useState('w');

	useEffect(() => {
		console.log('TURN: ', game.turn);
		game.setGameType('solo');
		if (location.pathname === '/play') {
			console.log('PLAY');
			setGameType('online');
		} else if (location.pathname === '/analysis') {
			setGameType('solo');
		}

		return () => {
			setFen(game.resetGame());
			resetGame();
		};
	}, []);

	useEffect(() => {
		setGameOver(game.isGameOver);
		console.log('GAME OVER?: ', gameOver);

		// eslint-disable-next-line
	}, [fen]);

	const highlightSquare = (
		sourceSquare: Square,
		squaresToHighlight: Square[]
	) => {
		const highlightStyles = game.highlightSquare(
			sourceSquare,
			squaresToHighlight
		);

		setSquareStyles({ ...squareStyles, ...highlightStyles });
	};

	const removeHighlightSquare = () => {
		setSquareStyles(game.squareStyling(pieceSquare));
	};

	const onMouseOverSquare = (square: Square) => {
		// console.log('MOUSE OVER: ', square);

		setPieceSquare(square);

		// get list of possible moves for this square
		let moves = game.getMoves(square);

		// return if no moves available
		if (moves.length === 0) return;

		let squaresToHighlight: Square[] = [];

		for (let i = 0; i < moves.length; i++) {
			squaresToHighlight.push(moves[i].to);
		}

		if (gameType === 'online') {
			if (game.turn === playerSide) {
				highlightSquare(square, squaresToHighlight);
			}
		} else {
			highlightSquare(square, squaresToHighlight);
		}
	};

	const onMouseOutSquare = () => {
		removeHighlightSquare();
	};

	const onDrop = (props: { sourceSquare: Square; targetSquare: Square }) => {
		const { sourceSquare, targetSquare } = props;

		// is online
		if (gameType === 'online') {
			if (game.turn === playerSide) {
				let move = game.movePiece(sourceSquare, targetSquare);

				if (move === null) return;
				setFen(game.fen);
				setHistory(game.history);
				setSquareStyles(game.squareStyling(pieceSquare));
			}
		} else {
			// solo
			let move = game.movePiece(sourceSquare, targetSquare);
			if (move === null) return;
			movePiece(move);
			setFen(game.fen);
			setHistory(game.history);
			setSquareStyles(game.squareStyling(pieceSquare));
			setOrientation(game.orientation);
		}
	};

	const onDragOverSquare = () => {
		//
	};

	const onSquareClick = (square: Square) => {
		if (gameType === 'online') {
			// ONLINE
			if (game.turn === playerSide) {
				setSquareStyles(game.squareStyling(square));
				setPieceSquare(square);

				let move = game.movePiece(pieceSquare ? pieceSquare : square, square);

				if (move === null) return;

				setFen(game.fen);
				setHistory(game.history);
				setPieceSquare(undefined);
			}
		} else {
			// SOLO
			setSquareStyles(game.squareStyling(square));
			setPieceSquare(square);

			let move = game.movePiece(pieceSquare ? pieceSquare : square, square);

			if (move === null) return;

			setFen(game.fen);
			setHistory(game.history);
			setPieceSquare(undefined);
		}
	};

	const onPieceClick = (piece: Piece) => {
		console.log('PIECE CLICK: ', piece);

		const pieceColor = piece.charAt(0);

		if (game.turn === playerSide) {
			console.log('Player can move');
		}
	};

	return (
		<BoardContainer>
			<OpponentContainer>
				<OpponentChip />
			</OpponentContainer>
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
				width={700}
			/>
			<PlayerContainer>
				<PlayerChip />
			</PlayerContainer>
		</BoardContainer>
	);
};

export default ChessboardDisplay;
