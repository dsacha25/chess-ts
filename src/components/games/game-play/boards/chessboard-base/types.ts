import { Square } from 'chess.js';
import Orientation from '../../../../../utils/types/orientation/orientation';

export interface ChessboardBaseProps {
	makeMove: (from: Square, to: Square) => void;
	fen: string;
	playersTurn: boolean;
	orientation: Orientation;
}
