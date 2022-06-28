import GameModeTypes from '../../../types/game-mode-type/game-mode-type';

const parseGameMode = (gameMode: GameModeTypes): string => {
	switch (gameMode) {
		case 'five_by_five':
			return '5 | 5';
		case 'five_minute':
			return '5 Minute';
		case 'ten_minute':
			return '10 Minute';
		case 'ten_by_fifteen':
			return '10 | 15';
		case 'one_day':
			return '1 Day';
		case 'three_day':
			return '3 Day';
		case 'untimed':
		default:
			return 'untimed';
	}
};

export default parseGameMode;
