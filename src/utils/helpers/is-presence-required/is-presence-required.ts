import GameModeTypes from '../../types/game-mode-type/game-mode-type';

const isPresenceRequired = (gameMode: GameModeTypes): boolean => {
	switch (gameMode) {
		case 'one_day':
		case 'three_day':
		case 'untimed':
			return false;
		default:
			return true;
	}
};

export default isPresenceRequired;
