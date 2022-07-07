import { Square } from 'chess.js';
import Orientation from '../../../../../utils/types/orientation/orientation';

export interface ChessboardBaseProps {
	fen: string;
	orientation: Orientation;
	playersTurn: boolean;
	makeMove: (from: Square, to: Square) => void;
}
