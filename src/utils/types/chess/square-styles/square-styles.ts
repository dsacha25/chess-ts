import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Square } from 'chess.js';

export type SquareStyles = {
	[square in Square]?: CSSProperties;
};
