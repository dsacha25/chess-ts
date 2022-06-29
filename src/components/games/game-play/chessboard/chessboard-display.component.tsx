import React, { useEffect, useState } from 'react';
import {
	BoardContainer,
	OpponentContainer,
	PlayerContainer,
	LoadSpinner,
} from './chessboard-display.styles';
import { Square } from 'chess.js';
import OpponentChip from '../../../chips/game-chips/opponent-chip/opponent-chip.component';
import PlayerChip from '../../../chips/game-chips/player-chip/player-chip.component';
import ChessGame from '../../../../utils/classes/chess-game/chess-game';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectAiLevel,
	selectFen,
	selectGameType,
	selectOrientation,
} from '../../../../redux/game/game.selector';

import useWindowSize from '../../../../hooks/use-window-size/use-window-size.hook';
import Orientation from '../../../../utils/types/orientation/orientation';
import logMessage from '../../../../utils/helpers/strings/log-message/log-message';

import ChessboardBase from '../boards/chessboard-base/chessboard-base.component';
import queryBoardSize from '../../../../utils/helpers/screen/query-board-size';
const game = new ChessGame();

const ChessboardDisplay = () => {
	//// TODO: REFACTOR INTO SOLO - ONLINE - AI CHESSBOARDS ////
	//

	const { width } = useWindowSize();

	const gameType = useSelector((state) => selectGameType(state));
	const fen = useSelector((state) => selectFen(state));
	const orientation = useSelector((state) => selectOrientation(state));
	const aiLevel = useSelector((state) => selectAiLevel(state));

	const { movePiece, setFen, setOrientation, makePendingMove } = useActions();

	const [boardSize, setBoardSize] = useState(800);
	const [fenLocal, setFenLocal] = useState(fen);
	const [turn, setTurn] = useState<Orientation>('white');
	const [aiMoving, setAiMoving] = useState(false);

	// ==== BOARD SIZE
	useEffect(() => {
		// USE WINDOW SIZE TO DEFINE BOARD SIZE
		setBoardSize(queryBoardSize(width));
	}, [width]);

	useEffect(() => {
		let to: NodeJS.Timeout;

		if (
			gameType === 'ai' &&
			aiLevel !== null &&
			turn !== orientation &&
			!game.isGameOver(fen)
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

	const aiMove = () => {
		logMessage('AI MOVE START', 'red');

		if (aiLevel === null) return;

		setAiMoving(true);
		console.log('ai level : ', aiLevel);
		let chessMove = game.movePieceAi(aiLevel, fen);

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
		} else if (gameType === 'ai') {
			if (game.getTurn(fen) === orientation) {
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

			{aiMoving && <LoadSpinner size="80px" />}

			<PlayerContainer>
				<PlayerChip />
			</PlayerContainer>
		</BoardContainer>
	);
};

export default ChessboardDisplay;
