import React, { CSSProperties, useEffect, useState } from 'react';
import {
	BoardContainer,
	GameOverDisplay,
	OpponentContainer,
	PlayerContainer,
	LoadSpinner,
} from './chessboard-display.styles';
import Chessboard, { Piece } from 'chessboardjsx';
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
	selectPromotionPieceType,
} from '../../../../redux/game/game.selector';
import { useLocation } from 'react-router-dom';
import { selectUserUID } from '../../../../redux/user/user.selector';
import { find } from 'lodash';
import useWindowSize from '../../../../hooks/use-window-size/use-window-size.hook';
import Orientation from '../../../../utils/types/orientation/orientation';
import logMessage from '../../../../utils/helpers/strings/log-message/log-message';
import globalStyles from '../../../../global-styles/global-styles';
import PromotionSelector from '../promotion-selector/promotion-selector.component';
import isPromoting from '../../../../utils/helpers/is-promoting/is-promoting';
const game = new ChessGame();

const ChessboardDisplay = () => {
	//// TODO: REFACTOR INTO SOLO - ONLINE - AI CHESSBOARDS ////
	//

	const { pathname } = useLocation();
	const { width } = useWindowSize();

	const activeGame = useSelector((state) => selectActiveGame(state));
	const uid = useSelector((state) => selectUserUID(state));
	const gameType = useSelector((state) => selectGameType(state));
	const fen = useSelector((state) => selectFen(state));
	const orientation = useSelector((state) => selectOrientation(state));
	const aiLevel = useSelector((state) => selectAiLevel(state));
	const promotionType = useSelector((state) => selectPromotionPieceType(state));

	const {
		movePiece,
		setFen,
		setOrientation,
		fetchEnemyInfoStart,
		makePendingMove,
		openActiveGameListener,
		clearPromotionPieceType,
	} = useActions();

	const [squareStyles, setSquareStyles] = useState<{
		[square in Square]?: CSSProperties;
	}>({});

	const [selectedSquare, setSelectedSquare] = useState<Square>();
	const [gameOver, setGameOver] = useState(
		game.isGameOver(fen) || activeGame?.gameOver
	);
	const [boardSize, setBoardSize] = useState(800);
	const [fenLocal, setFenLocal] = useState(fen);
	const [turn, setTurn] = useState<Orientation>('white');
	const [aiMoving, setAiMoving] = useState(false);
	const [promoting, setPromoting] = useState(false);
	const [storedMove, setStoredMove] = useState<{
		from: Square;
		to: Square;
	} | null>(null);

	useEffect(() => {
		console.log('NEW FEN: ', fen);
	}, [fen, fenLocal]);

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
		//// ONLINE GAME
		if (pathname === '/play' && activeGame) {
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
		// console.log('turn: ', game.turn, orientation);
		// console.log('AI turn: ', game.turn !== orientation);
		// console.log('FEN: ', fen);

		let to: NodeJS.Timeout;

		if (
			gameType === 'ai' &&
			aiLevel !== null &&
			turn !== orientation &&
			!gameOver
		) {
			setAiMoving(true);
			to = setTimeout(() => {
				aiMove();
			}, 250);
		}

		return () => {
			if (to) {
				clearTimeout(to);
			}
		};

		// eslint-disable-next-line
	}, [fen, gameType, turn, orientation, aiLevel, fenLocal]);

	/// PIECE PROMOTION
	useEffect(() => {
		if (promoting && promotionType && storedMove) {
			// make move
			const chessMove = game.promoteAndMove(
				fen,
				storedMove.from,
				storedMove.to,
				promotionType
			);

			if (chessMove) {
				logMessage(chessMove);
				setFen(chessMove.fen);
				setFenLocal(chessMove.fen);
				setTurn(chessMove.turn);
				movePiece({ move: chessMove.san, fen: chessMove.fen });
			}
			setStoredMove(null);
			clearPromotionPieceType();
			setPromoting(false);

			// clear promotion selection
		}

		// eslint-disable-next-line
	}, [promoting, promotionType, storedMove]);

	const aiMove = () => {
		logMessage('AI MOVE START', 'red');

		if (aiLevel === null) return;

		setAiMoving(true);
		console.log('ai level : ', aiLevel);
		const { from, to } = game.movePieceAi(aiLevel, fen);
		let chessMove = game.movePieceServer(fen, from, to);

		if (chessMove) {
			logMessage('CHESS MOVE FOUND', 'green');
			setFen(chessMove.fen);
			setFenLocal(chessMove.fen);
			setTurn(chessMove.turn);
			movePiece({ move: chessMove.san, fen: chessMove.fen });
			logMessage('AI MOVE SUCCESS', 'blue');
		}
		setAiMoving(false);
	};

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
		// if (selectedSquare) return;
		// get list of possible moves for this square
		const movesToHighlight = game.getMovesToHighlight(fen, square);

		// return if no moves available
		if (!movesToHighlight || movesToHighlight.length === 0) return;

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
		console.log('FROM - TO: ', from, to);
		if (from === to) return;
		let chessMove = game.movePieceServer(fen, from, to);
		console.log('CHESSS MOVE', chessMove);

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
			// setFen(chessMove.fen);
			// movePiece({ move: chessMove.san, fen: chessMove.fen });
			if (game.turn === orientation) {
				console.log('USER MOVE');
				setFen(chessMove.fen);
				setFenLocal(chessMove.fen);
				setTurn(chessMove.turn);
				movePiece({ move: chessMove.san, fen: chessMove.fen });
			} else {
				console.log('AI MOVE');

				setFen(chessMove.fen);
				movePiece({ move: chessMove.san, fen: chessMove.fen });
			}
		}
	};

	const onDrop = (props: {
		sourceSquare: Square;
		targetSquare: Square;
		piece: Piece;
	}) => {
		console.log('props: ', props);

		const { sourceSquare, targetSquare, piece } = props;
		console.log('PIECE: ', piece);
		console.log('ROW: ', targetSquare[1]);

		const piecePromoting = isPromoting(targetSquare[1], piece);
		console.log('IS PROMOTING: ', piecePromoting);

		if (piecePromoting) {
			setPromoting(true);
			setStoredMove({ from: sourceSquare, to: targetSquare });
		}

		if (!piecePromoting) {
			makeMove(sourceSquare, targetSquare);

			setSelectedSquare(undefined);
		}
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
				lightSquareStyle={{ backgroundColor: globalStyles.white }}
				darkSquareStyle={{ backgroundColor: globalStyles.accent }}
			/>

			{promoting && <PromotionSelector />}
			{aiMoving && <LoadSpinner size="80px" />}
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
