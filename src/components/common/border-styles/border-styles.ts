import { css } from 'styled-components';
import BorderPattern from '../../../assets/patterns/border-pattern.png';
import BorderPatternFilled from '../../../assets/patterns/border-pattern_filled.png';

export const StarBorder = css`
	border-image: url(${BorderPattern});
	border-image-slice: 106 fill;
	border-image-width: 20px;
	/* border-image-outset: 9px; */
	border-image-repeat: repeat;
`;

export const StarBorderFilled = css`
	border-image: url(${BorderPatternFilled});
	border-image-slice: 106 fill;
	border-image-width: 20px;
	border-image-outset: 10px;
	border-image-repeat: repeat;
`;
