import { ChessGameType } from '../../../types/chess-game-type/chess-game-type';
import GameTime from '../../../types/game-time/game-time';

const parseGameTime = (
	uid: string,
	game: ChessGameType
): GameTime | undefined => {
	return game.black.uid === uid ? game.black.gameTime : game.white.gameTime;
};

export default parseGameTime;
