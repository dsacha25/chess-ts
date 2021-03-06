import React, { useEffect, useState } from 'react';
import { Square } from 'chess.js';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectOrientation,
	selectFen,
	selectAiLevel,
} from '../../../../../redux/game/game.selector';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import { game } from '../../../../../utils/classes/chess-game/chess-game';
import Orientation from '../../../../../utils/types/chess/orientation/orientation';
import useWindowSize from '../../../../../hooks/use-window-size/use-window-size.hook';
import queryBoardSize from '../../../../../utils/helpers/screen/query-board-size';
import {
	BoardContainer,
	LoadSpinner,
	OpponentContainer,
	PlayerContainer,
} from '../board-styles/board-styles.styles';
import ChessboardBase from '../chessboard-base/chessboard-base.component';
import AiChip from '../../../../chips/game-chips/ai-chip/ai-chip.component';
import PlayerChip from '../../../../chips/game-chips/player-chip/player-chip.component';

const AiChessboard = () => {
	const { width } = useWindowSize();
	const { setFen, movePiece } = useActions();
	const orientation = useSelector((state) => selectOrientation(state));
	const fen = useSelector((state) => selectFen(state));
	const aiLevel = useSelector((state) => selectAiLevel(state));

	const [turn, setTurn] = useState<Orientation>('white');
	const [aiMoving, setAiMoving] = useState(false);
	const [boardSize, setBoardSize] = useState(800);

	const makeMove = (from: Square, to: Square) => {
		if (from === to) return;
		let chessMove = game.movePieceServer(fen, from, to);

		if (chessMove === null) return;

		if (game.getTurn(fen) === orientation) {
			setFen(chessMove.fen);
			// setFenLocal(chessMove.fen);
			setTurn(chessMove.turn);
			movePiece({ move: chessMove.san, fen: chessMove.fen });
		} else {
			setFen(chessMove.fen);
			movePiece({ move: chessMove.san, fen: chessMove.fen });
		}
	};

	const aiMove = () => {
		if (aiLevel === null) return;

		setAiMoving(true);
		let chessMove = game.movePieceAi(aiLevel, fen);

		if (chessMove) {
			setFen(chessMove.fen);
			// setFenLocal(chessMove.fen);
			setTurn(chessMove.turn);
			movePiece({ move: chessMove.san, fen: chessMove.fen });
		}
		setAiMoving(false);
	};

	useEffect(() => {
		// USE WINDOW SIZE TO DEFINE BOARD SIZE
		setBoardSize(queryBoardSize(width));
	}, [width]);

	useEffect(() => {
		let to: NodeJS.Timeout;

		if (aiLevel !== null && turn !== orientation && !game.isGameOver(fen)) {
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
	}, [fen, turn, orientation, aiLevel]);

	return (
		<BoardContainer size={boardSize}>
			<OpponentContainer>
				<AiChip aiLevel={aiLevel} />
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

export default AiChessboard;
