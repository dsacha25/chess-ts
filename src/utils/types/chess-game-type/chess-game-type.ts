import { Enemyship } from '../enemyship/enemyship';
import { Player } from '../player/player';

export interface ChessGameType extends Enemyship {
	gameOver: boolean;
	moves: string[];
	turn: 'white' | 'black';
	black: Player;
	white: Player;
	latestMove: string;
}
