import { ChessGameType } from '../../../types/chess-game-type/chess-game-type';
import GameTime from '../../../types/game-time/game-time';
import parseCurrentPlayer from '../parse-current-player/parse-current-player';

const parseGameTime = (
	uid: string,
	game: ChessGameType | null
): GameTime | undefined => {
	if (!game) return undefined;

	return parseCurrentPlayer(uid, game).gameTime;
};

export default parseGameTime;
