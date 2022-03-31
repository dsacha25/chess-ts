import { Move } from 'chess.js';
import Orientation from '../orientation/orientation';

export interface ConfirmedMove {
	fen: string;
	move: Move | string;
	id: string;
	winner: Orientation | null;
	gameOver?: boolean;
}
