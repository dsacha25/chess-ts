import React, { CSSProperties, useEffect, useState } from 'react';
import {
	BoardContainer,
	OpponentContainer,
	PlayerContainer,
} from './chessboard-display.styles';
import Chessboard from 'chessboardjsx';
import { Square } from 'chess.js';
import OpponentChip from '../chips/game-chips/opponent-chip/opponent-chip.component';
import PlayerChip from '../chips/game-chips/player-chip/player-chip.component';
import ChessGame from '../../utils/classes/chess-game/chess-game';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import {
	selectActiveGame,
	selectFen,
	selectGameInstance,
	selectGameType,
	selectOrientation,
	selectSide,
} from '../../redux/game/game.selector';
import { useLocation } from 'react-router-dom';
import { selectUserUID } from '../../redux/user/user.selector';
import { find } from 'lodash';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine';
const jsGame = new Game();
const game = new ChessGame();

const ChessboardDisplay = () => {
	const location = useLocation();

	const activeGame = useSelector((state) => selectActiveGame(state));

	const gameState = useSelector((state) => selectGameInstance(state));
	const uid = useSelector((state) => selectUserUID(state));
	const gameType = useSelector((state) => selectGameType(state));
	const fen = useSelector((state) => selectFen(state));
	const orientation = useSelector((state) => selectOrientation(state));
	const side = useSelector((state) => selectSide(state));
	const {
		movePiece,
		resetGame,
		setGameType,
		setFen,
		setOrientation,
		fetchEnemyInfoStart,
		makePendingMove,
	} = useActions();

	const [gameI, setGameState] = useState<ChessGame>(game);

	const [squareStyles, setSquareStyles] = useState<{
		[square in Square]?: CSSProperties;
	}>({});

	const [selectedSquare, setSelectedSquare] = useState<Square>();

	const [gameOver, setGameOver] = useState(game.isGameOver);

	useEffect(() => {
		if (gameState) {
			setGameState(gameState);
		}

		// eslint-disable-next-line
	}, [gameState]);

	useEffect(() => {
		return () => {
			// clearActiveGame();
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (location.pathname === '/play' && activeGame) {
			const enemyUID = find(activeGame.users, (player) => player !== uid);
			console.log('ENEMY UID: ', enemyUID);
			if (enemyUID) {
				fetchEnemyInfoStart(enemyUID);
			}
		}

		// eslint-disable-next-line
	}, [activeGame]);

	useEffect(() => {
		console.log('TURN: ', game.turn);
		console.log('FEN: ', game.fen);
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
		if (game.isGameOver) {
			console.log('WINNER: ', game.getWinner());
		}

		// eslint-disable-next-line
	}, [fen]);

	useEffect(() => {
		if (selectedSquare && game.turn === side) {
			const moves = game.getMovesToHighlight(selectedSquare);
			if (moves.length > 0) {
				highlightSquare(selectedSquare, moves);
			}
		} else {
			setSquareStyles(game.squareStyling(selectedSquare));
		}

		// eslint-disable-next-line
	}, [selectedSquare]);

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
		setSquareStyles(game.squareStyling(selectedSquare));
	};

	const onMouseOverSquare = (square: Square) => {
		// get list of possible moves for this square
		// console.log('GAME FUCK SHIT: ', game);
		// console.log(game.squareStyling);

		const movesToHighlight = game.getMovesToHighlight(square);
		// console.log('HIGHLIGHT: ', movesToHighlight);

		// return if no moves available
		if (movesToHighlight.length === 0) return;
		// console.log('GAME TURN: ', game.turn);

		if (gameType === 'online') {
			if (game.turn === side) {
				highlightSquare(square, movesToHighlight);
			}
		} else {
			highlightSquare(square, movesToHighlight);
		}
	};

	const onMouseOutSquare = () => {
		removeHighlightSquare();
	};

	const makeMove = (from: Square, to: Square) => {
		// console.log('TYPE:', gameType);
		// console.log('GAME:', game);
		// console.log('TURN:', game.turn);
		// console.log('SIDE:', side);
		// console.log('MOVE JS:', move(fen));

		let moveJS = move(fen, from, to);
		console.log('MOVE JS:', moveJS);
		console.log(gameType === 'online' && game.turn !== side);

		if (gameType === 'online' && game.turn !== side) return;
		// console.log('FROM:', from);
		// console.log('TO:', to);

		let move2 = game.game.move({ from, to, promotion: 'q' });

		let move1 = game.movePiece(from, to);

		console.log('MOVE:', move1);

		if (move2 === null) return;

		// setSquareStyles(game.squareStyling(selectedSquare));

		if (gameType === 'online') {
			console.log('MAKE PENDING MOVE');
			setFen(game.fen);
			makePendingMove({
				fen: game.fen,
				move: move2,
				winner: game.getWinner(),
				gameOver: game.isGameOver,
			});
		} else if (gameType === 'solo') {
			setFen(game.fen);
			movePiece(move2);
			setTimeout(() => {
				setOrientation(game.orientation);
			}, 500);
		}
	};

	const onDrop = (props: { sourceSquare: Square; targetSquare: Square }) => {
		const { sourceSquare, targetSquare } = props;

		makeMove(sourceSquare, targetSquare);

		setSelectedSquare(undefined);
	};

	const onSquareClick = (square: Square) => {
		setSelectedSquare(square);

		if (selectedSquare) {
			makeMove(selectedSquare, square);

			setSelectedSquare(undefined);
		}

		setSquareStyles(game.squareStyling(square));
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
				onSquareClick={onSquareClick}
				onDrop={onDrop}
				squareStyles={squareStyles}
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
