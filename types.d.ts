declare module 'js-chess-engine';

type PlayedMove = { string: string };

interface ConfigObject {
	turn: 'white' | 'black';
	pieces: { [key: string]: string };
	moves: { [key: string]: string[] };
	isFinished: boolean;
	check: boolean;
	checkMate: boolean;
	castling: {
		whiteLong: boolean;
	};
}

type BoardConfig = ConfigObject | string;

export declare class Game {
	move(from: string, to: string): { [key: string]: string } | Error;

	moves(from: string | null) {
		return (
			(from
				? this.board.getMoves()[from.toUpperCase()]
				: this.board.getMoves()) || []
		);
	}

	setPiece(location, piece): void;

	removePiece(location): void;

	aiMove(level = 2) {
		const move = this.board.calculateAiMove(level);
		return this.move(move.from, move.to);
	}

	getHistory(reversed = false) {
		return reversed ? this.board.history.reverse() : this.board.history;
	}

	printToConsole() {
		printToConsole(this.board.configuration);
	}

	exportJson() {
		return this.board.exportJson();
	}

	exportFEN() {
		return getFEN(this.board.configuration);
	}
}

export function moves(config) {
	if (!config) {
		throw new Error('Configuration param required.');
	}
	const game = new Game(config);
	return game.moves();
}

export function status(config) {
	if (!config) {
		throw new Error('Configuration param required.');
	}
	const game = new Game(config);
	return game.exportJson();
}

export function getFen(config) {
	if (!config) {
		throw new Error('Configuration param required.');
	}
	const game = new Game(config);
	return game.exportFEN();
}

export function move(config, from, to) {
	if (!config) {
		throw new Error('Configuration param required.');
	}
	const game = new Game(config);
	game.move(from, to);
	if (typeof config === 'object') {
		return game.exportJson();
	} else {
		return game.exportFEN();
	}
}

export function aiMove(config, level = 2) {
	if (!config) {
		throw new Error('Configuration param required.');
	}
	const game = new Game(config);
	const move = game.board.calculateAiMove(level);
	return { [move.from]: move.to };
}
