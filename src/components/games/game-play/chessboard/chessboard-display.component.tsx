import React, { CSSProperties, useEffect, useState } from 'react';
import {
	BoardContainer,
	GameOverDisplay,
	OpponentContainer,
	PlayerContainer,
} from './chessboard-display.styles';
import Chessboard from 'chessboardjsx';
import { Square } from 'chess.js';
import OpponentChip from '../../../chips/game-chips/opponent-chip/opponent-chip.component';
import PlayerChip from '../../../chips/game-chips/player-chip/player-chip.component';
import ChessGame from '../../../../utils/classes/chess-game/chess-game';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectActiveGame,
	selectAiLevel,
	selectFen,
	selectGameType,
	selectOrientation,
} from '../../../../redux/game/game.selector';
import { useLocation } from 'react-router-dom';
import { selectUserUID } from '../../../../redux/user/user.selector';
import { find } from 'lodash';
const game = new ChessGame();

const ChessboardDisplay = () => {
	const location = useLocation();

	const activeGame = useSelector((state) => selectActiveGame(state));
	const uid = useSelector((state) => selectUserUID(state));
	const gameType = useSelector((state) => selectGameType(state));
	const fen = useSelector((state) => selectFen(state));
	const orientation = useSelector((state) => selectOrientation(state));
	const aiLevel = useSelector((state) => selectAiLevel(state));

	const {
		movePiece,
		clearActiveGame,
		setFen,
		setOrientation,
		fetchEnemyInfoStart,
		makePendingMove,
		openActiveGameListener,
	} = useActions();

	const [squareStyles, setSquareStyles] = useState<{
		[square in Square]?: CSSProperties;
	}>({});

	const [selectedSquare, setSelectedSquare] = useState<Square>();
	const [gameOver, setGameOver] = useState(
		game.isGameOver(fen) || activeGame?.gameOver
	);
	const boardSize = 700;

	useEffect(() => {
		if (activeGame) {
			console.log('GAME EXISTS');
			openActiveGameListener();
		} else {
			console.log('GAME NOT FOUND');
		}

		// eslint-disable-next-line
	}, [activeGame]);

	useEffect(() => {
		return () => {
			clearActiveGame();
			// setFen(fen);
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
		setGameOver(game.isGameOver(fen));
		console.log('GAME OVER?: ', game.isGameOver(fen));
		if (game.isGameOver(fen)) {
			console.log('WINNER: ', game.getWinner(fen));

			// UPDATE FIREBASE
		}

		// eslint-disable-next-line
	}, [fen]);

	useEffect(() => {
		if (selectedSquare && game.turn === orientation) {
			const moves = game.getMovesToHighlight(fen, selectedSquare);
			if (moves && moves.length > 0) {
				highlightSquare(selectedSquare, moves);
			}
		} else {
			setSquareStyles(game.squareStyling(fen, selectedSquare));
		}

		// eslint-disable-next-line
	}, [selectedSquare]);

	useEffect(() => {
		console.log('turn: ', game.turn, orientation);

		if (
			gameType === 'ai' &&
			aiLevel &&
			game.turn !== orientation &&
			!gameOver
		) {
			const { from, to } = game.movePieceAi(aiLevel, fen);

			makeMove(from, to);
		}

		// eslint-disable-next-line
	}, [gameType, game.turn, orientation]);

	const highlightSquare = (
		sourceSquare: Square,
		squaresToHighlight: Square[]
	) => {
		const highlightStyles = game.highlightSquare(
			fen,
			sourceSquare,
			squaresToHighlight
		);

		setSquareStyles({ ...squareStyles, ...highlightStyles });
	};

	const removeHighlightSquare = () => {
		setSquareStyles(game.squareStyling(fen, selectedSquare));
	};

	const onMouseOverSquare = (square: Square) => {
		// get list of possible moves for this square
		const movesToHighlight = game.getMovesToHighlight(fen, square);

		// return if no moves available
		if (!movesToHighlight || movesToHighlight.length === 0) return;
		// console.log('GAME TURN: ', game.turn);

		if (gameType === 'online') {
			if (game.turn === orientation) {
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
		let chessMove = game.movePieceServer(fen, from, to);
		if (chessMove === null) return;

		setSquareStyles(game.squareStyling(fen, selectedSquare));

		if (gameType === 'online') {
			if (game.turn === orientation) {
				setFen(chessMove.fen);
				makePendingMove({
					fen: chessMove.fen,
					previousFen: fen,
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

			setGameOver(chessMove.winner !== null);
		} else if (gameType === 'ai') {
			if (game.turn === orientation) {
				setFen(chessMove.fen);
				movePiece({ move: chessMove.san, fen: chessMove.fen });
			} else {
				setFen(chessMove.fen);
				movePiece({ move: chessMove.san, fen: chessMove.fen });
			}
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

		setSquareStyles(game.squareStyling(fen, square));
	};

	return (
		<BoardContainer size={boardSize}>
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
				width={boardSize}
			/>
			{gameOver && (
				<GameOverDisplay>
					<h1>Game Over, Bitch</h1>
				</GameOverDisplay>
			)}
			<PlayerContainer>
				<PlayerChip />
			</PlayerContainer>
		</BoardContainer>
	);
};

export default ChessboardDisplay;
