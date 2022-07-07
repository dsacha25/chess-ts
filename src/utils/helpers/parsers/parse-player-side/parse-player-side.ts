import { ChessGameType } from '../../../types/chess-game-type/chess-game-type';
import Orientation from '../../../types/orientation/orientation';

const parsePlayerSide = (game: ChessGameType, uid?: string): Orientation => {
	if (!uid) return 'white';
	return game.black.uid === uid ? 'black' : 'white';
};

export default parsePlayerSide;
