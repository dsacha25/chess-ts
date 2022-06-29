import GameTime from '../game-time/game-time';

export interface Player {
	uid: string;
	displayName: string;
	gameTime?: GameTime;
}
