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
} from 'js-chess-engine';
import { initial } from 'lodash';
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
	public type: GameType = 'solo';
	public boardConfig: BoardConfig = DEFAULT_POSITION;
	public fen: string = DEFAULT_POSITION;
	public previousFen: string = this.fen;

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

	get isGameOver(): boolean {
		return (
			status(this.boardConfig).isFinished || status(this.boardConfig).checkMate
		);
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

	setGameType(gameType: GameType): GameType {
		return (this.type = gameType);
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

		const chessMove = this.chess.move({ from, to });
		console.log('MOVE: ', chessMove);

		if (!chessMove) return null;

		const fen = getFen(move(config, from, to));

		this.chess.load(fen);
		this.getStatus(fen);

		console.log('WINNER?: ', this.getWinner(fen));

		return {
			fen,
			san: chessMove.san,
			turn: this.getStatus(fen).turn,
			winner: this.getWinner(fen),
		};
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
		const backgroundColor = 'rgba(255, 0, 0, 0.4)';
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
						background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
						borderRadius: '50%',
					},
				},
				...this.squareStyling(fen, sourceSquare),
			};
		}, {});
	}
}

export default ChessGame;
