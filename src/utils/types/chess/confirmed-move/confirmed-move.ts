import { Move } from 'chess.js';
import GameTime from '../game-time/game-time';
import Orientation from '../orientation/orientation';

export interface ConfirmedMove {
	fen: string;
	move: Move | string;
	id: string;
	winner: Orientation | null;
	gameOver?: boolean;
	gameTime?: GameTime;
}
