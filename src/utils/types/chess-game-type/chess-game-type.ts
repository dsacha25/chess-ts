import { Enemyship } from '../enemyship/enemyship';

export interface ChessGameType extends Enemyship {
	gameOver: boolean;
	moves: string[];
	turn: 'white' | 'black';
	black: string;
	white: string;
	latestMove: string;
}
