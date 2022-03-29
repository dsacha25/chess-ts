declare module 'js-chess-engine';

type PlayedMove = { string: string };

type WhitePieces = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K';
type BlackPieces = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

type Columns = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type Rows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type Position = `${Columns}${Rows}`;

type Square =
	| 'a8'
	| 'b8'
	| 'c8'
	| 'd8'
	| 'e8'
	| 'f8'
	| 'g8'
	| 'h8'
	| 'a7'
	| 'b7'
	| 'c7'
	| 'd7'
	| 'e7'
	| 'f7'
	| 'g7'
	| 'h7'
	| 'a6'
	| 'b6'
	| 'c6'
	| 'd6'
	| 'e6'
	| 'f6'
	| 'g6'
	| 'h6'
	| 'a5'
	| 'b5'
	| 'c5'
	| 'd5'
	| 'e5'
	| 'f5'
	| 'g5'
	| 'h5'
	| 'a4'
	| 'b4'
	| 'c4'
	| 'd4'
	| 'e4'
	| 'f4'
	| 'g4'
	| 'h4'
	| 'a3'
	| 'b3'
	| 'c3'
	| 'd3'
	| 'e3'
	| 'f3'
	| 'g3'
	| 'h3'
	| 'a2'
	| 'b2'
	| 'c2'
	| 'd2'
	| 'e2'
	| 'f2'
	| 'g2'
	| 'h2'
	| 'a1'
	| 'b1'
	| 'c1'
	| 'd1'
	| 'e1'
	| 'f1'
	| 'g1'
	| 'h1';

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

export declare class Game {
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

export declare function moves(config: BoardConfig): {
	[key: Position]: Position[];
};

export declare function status(config: BoardConfig): ConfigObject;

export declare function getFen(config: BoardConfig): string;

export declare function move(
	config: BoardConfig,
	from: Position,
	to: Position
): BoardConfig;

export declare function aiMove(
	config: BoardConfig,
	level: AiLevel
): { [key: Position]: Position[] };
