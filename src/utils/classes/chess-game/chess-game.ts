import { CSSProperties } from 'react';
import { ChessInstance, Square } from 'chess.js';

import Orientation from '../../types/orientation/orientation';

import {
	Game,
	move,
	status,
	moves,
	aiMove,
	getFen,
	BoardConfig,
	Turn,
	History,
	ConfigObject,
	Position,
	Move,
	Moves,
	AiLevel,
} from 'js-chess-engine';
import { keys, values } from 'lodash';
import { PromotionPieces } from '../../types/promotion-pieces/promotion-pieces';
const Chess = require('chess.js');

const DEFAULT_POSITION =
	'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

interface ServerMove {
	fen: string;
	san: string;
	turn: Orientation;
	winner: Orientation | null;
}

class ChessGame {
	public game: Game = new Game();
	public chess: ChessInstance = new Chess();
	public squareStyles: { [square in Square]?: CSSProperties } = {};
	public boardConfig: BoardConfig = DEFAULT_POSITION;
	public fen: string = DEFAULT_POSITION;

	public hoverColor: string = '#091e3b';
	public moveColor: string = '#bccbf2';

	constructor(config?: BoardConfig) {
		if (config) {
			this.game = new Game(config);
		}
	}

	setFen(config: BoardConfig): string {
		return (this.fen = getFen(config));
	}

	get turn(): Turn {
		return status(this.boardConfig).turn;
	}

	get history(): History {
		return this.getHistory(this.boardConfig);
	}

	get orientation(): Orientation {
		return status(this.boardConfig).turn;
	}

	isGameOver(config: BoardConfig): boolean {
		return status(config).isFinished || status(config).checkMate;
	}

	inCheck(fen: BoardConfig): boolean {
		return status(fen).check;
	}

	inCheckMate(fen: BoardConfig): boolean {
		return status(fen).checkMate;
	}

	setGame(config: BoardConfig) {
		this.game = new Game(config);
		this.boardConfig = config;
		this.fen = getFen(config);
		return this.game;
	}

	getTurn(config: BoardConfig): Turn {
		return status(config).turn;
	}

	getStatus(config: BoardConfig): ConfigObject {
		return (this.boardConfig = status(config));
	}

	getHistory(config: BoardConfig): History {
		this.game.getHistory();
		this.chess.load(this.setFen(status(config)));
		this.chess.history({ verbose: true });

		this.setGame(status(config)).getHistory();

		// console.log('CHESS HISTORY: ', this.history);
		// console.log('CHESS STATUS: ', status(config).moves);

		return this.setGame(config).getHistory();
	}

	getWinner(config: BoardConfig): Orientation | null {
		const board = this.getStatus(config);

		if (board.isFinished || board.checkMate) {
			if (board.turn === 'black') {
				return 'white';
			} else if (board.turn === 'white') {
				return 'black';
			}
		}
		return null;
	}

	resetGame(): string {
		this.setGame(DEFAULT_POSITION);

		// console.log('BOARD?: ', this.setGame(DEFAULT_POSITION).board);

		return this.fen;
	}

	getMoves(config: BoardConfig, square: Position): Position[] | undefined {
		return moves(config)[square.toUpperCase()];
	}

	getMovesToHighlight(fen: BoardConfig, square: Square) {
		return this.getMoves(fen, square);
	}

	movePiece(from: Square, to: Square): { [position in Position]: Position } {
		return this.game.move(from, to);
	}

	movePieceServer(
		config: BoardConfig,
		from: Square,
		to: Square,
		promotion?: PromotionPieces
	): ServerMove | null {
		this.chess.load(getFen(config));

		const chessMove = this.chess.move({
			from,
			to,
			promotion: promotion || 'q',
		});

		if (!chessMove) return null;

		// MAKE MOVE
		const fen = this.chess.fen();

		// UPDATE BOARD STATE
		this.chess.load(fen);
		this.getStatus(fen);

		return {
			fen,
			san: chessMove.san,
			turn: this.getStatus(fen).turn,
			winner: this.getWinner(fen),
		};
	}

	movePieceAi(level: AiLevel, fen: BoardConfig) {
		const chessMove = aiMove(fen, level);

		const from = keys(chessMove)[0].toLowerCase() as Square;
		const to = values<string>(chessMove)[0].toLowerCase() as Square;

		return this.movePieceServer(fen, from, to);
	}

	squareStyling(
		fen: BoardConfig,
		pieceSquare: Square | undefined
	): {
		[key: string]: { [key: string]: string };
	} {
		const history = this.getHistory(fen);

		const sourceSquare = history.length && history[history.length - 1].from;
		const targetSquare = history.length && history[history.length - 1].to;
		const backgroundColor = this.hoverColor;
		return (this.squareStyles = {
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
		});
	}

	highlightSquare(
		fen: BoardConfig,
		sourceSquare: Square,
		squaresToHighlight: Square[]
	) {
		this.boardConfig = fen;

		return [
			sourceSquare,
			...squaresToHighlight.map((square) => square.toLowerCase()),
		].reduce((a, c) => {
			return {
				...a,
				...{
					[c]: {
						background: `radial-gradient(circle, ${this.moveColor} 36%, transparent 40%)`,
						borderRadius: '50%',
					},
				},
				...this.squareStyling(fen, sourceSquare),
			};
		}, {});
	}
}

export const game = new ChessGame();

export default ChessGame;
