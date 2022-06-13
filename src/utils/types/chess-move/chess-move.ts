import { Move } from 'chess.js';
import Orientation from '../orientation/orientation';

export interface ChessMove {
	fen: string;
	move: Move | string;
	winner: Orientation | null;
	gameOver?: boolean;
}
