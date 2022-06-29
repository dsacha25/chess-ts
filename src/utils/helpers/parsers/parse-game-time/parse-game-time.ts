import { ChessGameType } from '../../../types/chess-game-type/chess-game-type';
import GameTime from '../../../types/game-time/game-time';

const parseGameTime = (
	enemyUID: string,
	game: ChessGameType
): GameTime | void => {
	return game.black.uid === enemyUID
		? game.black.gameTime
		: game.white.gameTime;
};

export default parseGameTime;
