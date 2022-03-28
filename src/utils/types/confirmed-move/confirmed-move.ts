import { Move } from 'chess.js';
import Orientation from '../orientation/orientation';

export interface ConfirmedMove {
	fen: string;
	move: Move;
	id: string;
	winner: Orientation | null;
	gameOver?: boolean;
}
