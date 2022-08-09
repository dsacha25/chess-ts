import { Square } from 'chess.js';
import { CSSProperties } from 'styled-components';

export type SquareStyles = {
	[square in Square]?: CSSProperties;
};
