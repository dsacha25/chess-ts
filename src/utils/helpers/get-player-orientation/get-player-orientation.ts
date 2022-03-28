import Orientation from '../../types/orientation/orientation';

export const getPlayerOrientation = (
	whiteUID: string,
	uid: string
): Orientation => {
	return whiteUID === uid ? 'white' : 'black';
};
