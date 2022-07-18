import { AiLevel } from 'js-chess-engine';
import { HistoryMove } from '../history-move/history-move';
import Orientation from '../orientation/orientation';

export interface ChessGameAiType {
	gameOver: boolean;
	moves: HistoryMove[];
	turn: Orientation;
	aiLevel: AiLevel | null;
	latestMove: string;
	fen: string;
	winner: Orientation | null;
	playerColor: Orientation;
}
