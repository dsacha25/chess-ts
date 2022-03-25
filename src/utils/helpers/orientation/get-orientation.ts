import Orientation from '../../types/orientation/orientation';
import Side from '../../types/side/side';

const getOrientation = (side: Side): Orientation => {
	return side === 'w' ? 'white' : 'black';
};

export default getOrientation;
