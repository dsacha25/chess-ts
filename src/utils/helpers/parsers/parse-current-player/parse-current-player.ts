import { ChessGameType } from '../../../types/chess-game-type/chess-game-type';
import { Player } from '../../../types/player/player';

const parseCurrentPlayer = (uid: string, game: ChessGameType): Player =>
	game.black.uid === uid ? game.black : game.white;

export default parseCurrentPlayer;
