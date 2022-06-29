import { Enemyship } from '../enemyship/enemyship';
import GameModeTypes from '../game-mode-type/game-mode-type';
import GameTime from '../game-time/game-time';
import { HistoryMove } from '../history-move/history-move';
import Orientation from '../orientation/orientation';
import { Player } from '../player/player';

export interface ChessGameType extends Enemyship {
	id: string;
	gameOver: boolean;
	gameMode: GameModeTypes;
	moves: HistoryMove[];
	turn: Orientation;
	black: Player;
	white: Player;
	latestMove: string;
	fen: string;
	winner: Orientation | null;
	gameTime: GameTime;
}
