import { CSSProperties } from 'react';
import { ChessInstance, Move, Square } from 'chess.js';
import getOrientation from '../../helpers/orientation/get-orientation';
import Orientation from '../../types/orientation/orientation';
import Side from '../../types/side/side';
import GameType from '../../types/game-type/game-type';
const Chess = require('chess.js');

class ChessGame {
	public game: ChessInstance = new Chess();
	public squareStyles: { [square in Square]?: CSSProperties } = {};
	public type: GameType = 'solo';

	get fen(): string {
		return this.game.fen();
	}

	get turn(): Side {
		return this.game.turn();
	}

	get history(): Move[] {
		return this.game.history({ verbose: true });
	}

	get orientation(): Orientation {
		return getOrientation(this.turn);
	}

	get isGameOver(): boolean {
		return this.game.game_over();
	}

	setGameType(gameType: GameType): GameType {
		return (this.type = gameType);
	}

	endGame(): boolean {
		return this.game.game_over();
	}

	resetGame(): string {
		this.game.reset();
		return this.fen;
	}

	getMoveString(move: Move): string {
		const { san } = move;

		return '';
	}

	getMoves(square: Square): Move[] {
		return this.game.moves({ square, verbose: true });
	}

	getMovesToHighlight(square: Square): Square[] {
		return this.getMoves(square).map((move) => move.to);
	}

	movePiece(from: Square, to: Square): Move | null {
		return this.game.move({
			from,
			to,
			promotion: 'q',
		});
	}

	squareStyling(pieceSquare: Square | undefined) {
		const sourceSquare =
			this.history.length && this.history[this.history.length - 1].from;
		const targetSquare =
			this.history.length && this.history[this.history.length - 1].to;

		const backgroundColor = 'rgba(255, 0, 0, 0.4)';

		return (this.squareStyles = {
			[pieceSquare ? pieceSquare : '']: { backgroundColor },
			...(this.history.length && {
				[sourceSquare]: {
					backgroundColor,
				},
			}),
			...(this.history.length && {
				[targetSquare]: {
					backgroundColor,
				},
			}),
		});
	}

	highlightSquare(sourceSquare: Square, squaresToHighlight: Square[]) {
		return [sourceSquare, ...squaresToHighlight].reduce((a, c) => {
			return {
				...a,
				...{
					[c]: {
						background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
						borderRadius: '50%',
					},
				},
				...this.squareStyling(sourceSquare),
			};
		}, {});
	}
}

export default ChessGame;
