import { Move } from 'chess.js';
import { Enemyship } from '../enemyship/enemyship';
import { HistoryMove } from '../history-move/history-move';
import Orientation from '../orientation/orientation';
import { Player } from '../player/player';

export interface ChessGameType extends Enemyship {
	id: string;
	gameOver: boolean;
	moves: HistoryMove[];
	turn: 'white' | 'black';
	black: Player;
	white: Player;
	latestMove: string;
	fen: string;
	winner: Orientation | null;
}
