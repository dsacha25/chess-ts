import { CSSProperties } from 'react';
import { ChessInstance, Square } from 'chess.js';
import getOrientation from '../../helpers/orientation/get-orientation';
import Orientation from '../../types/orientation/orientation';
import Side from '../../types/side/side';
import GameType from '../../types/game-type/game-type';
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
import { initial, keys, values } from 'lodash';
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
	public previousFen: string = this.fen;
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

	setGame(config: BoardConfig) {
		this.game = new Game(config);
		this.boardConfig = config;
		this.fen = getFen(config);
		return this.game;
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
		to: Square
	): ServerMove | null {
		this.previousFen = getFen(config);
		this.chess.load(getFen(config));

		console.log('FROM: ', from);
		console.log('TO:', to);

		const chessMove = this.chess.move({ from, to });
		console.log('MOVE: ', chessMove);

		if (!chessMove) return null;

		const fen = getFen(move(config, from, to));

		this.chess.load(fen);
		this.getStatus(fen);

		console.log('WINNER?: ', this.getWinner(fen));
		this.boardConfig = fen;
		const status = this.getStatus(fen);
		console.log('STATUS: ', status);

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

		return { from, to };
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

export default ChessGame;
