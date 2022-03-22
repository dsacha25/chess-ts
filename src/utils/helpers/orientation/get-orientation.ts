import Orientation from '../../types/orientation/orientation';

const getOrientation = (orientation: 'w' | 'b'): Orientation => {
	return orientation === 'w' ? 'white' : 'black';
};

export default getOrientation;
