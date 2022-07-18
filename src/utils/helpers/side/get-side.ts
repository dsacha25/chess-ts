import Orientation from '../../types/chess/orientation/orientation';
import Side from '../../types/chess/side/side';

const getSide = (orientation: Orientation): Side => {
	return orientation === 'white' ? 'w' : 'b';
};

export default getSide;
