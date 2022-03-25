import Orientation from '../../types/orientation/orientation';
import Side from '../../types/side/side';

const getSide = (orientation: Orientation): Side => {
	return orientation === 'white' ? 'w' : 'b';
};

export default getSide;
