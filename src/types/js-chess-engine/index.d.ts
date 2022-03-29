declare module 'js-chess-engine' {
	type PlayedMove = { string: string };

	type WhitePieces = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K';
	type BlackPieces = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

	type Columns = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
	type Rows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

	type Position = `${Columns}${Rows}`;

	type Pieces = WhitePieces | BlackPieces;

	type Turn = 'black' | 'white';

	type AiLevel = 0 | 1 | 2 | 3 | 4;

	interface ConfigObject {
		turn: Turn;
		pieces: { [key: Position]: Pieces };
		moves: { [key: Position]: Position[] };
		isFinished: boolean;
		check: boolean;
		checkMate: boolean;
		castling: {
			whiteLong: boolean;
			whiteShort: boolean;
			blackLong: boolean;
			blackShort: boolean;
		};
		enPassant: Position | null;
		halfMove: number;
		fullMove: number;
	}

	type BoardConfig = ConfigObject | string;

	interface BoardMove {
		from: Position;
		to: Position;
		configuration: ConfigObject;
	}

	type History = BoardMove[];

	export class Game {
		move(from: Position, to: Position): { [key: Position]: Position };

		moves(from: Position | null): Position[];

		setPiece(location, piece): void;

		removePiece(location): void;

		aiMove(level: AiLevel): { [key: Position]: Position };

		getHistory(reversed: boolean): History;

		printToConsole(): void;

		exportJson(): ConfigObject;

		exportFEN(): string;
	}

	export function moves(config: BoardConfig): {
		[key: Position]: Position[];
	};

	export function status(config: BoardConfig): ConfigObject;

	export function getFen(config: BoardConfig): string;

	export function move(
		config: BoardConfig,
		from: Position,
		to: Position
	): BoardConfig;

	export function aiMove(
		config: BoardConfig,
		level: AiLevel
	): { [key: Position]: Position[] };
}
