import { css } from 'styled-components';
import BorderPattern from '../../../assets/patterns/border-pattern.png';
import BorderPatternFilled from '../../../assets/patterns/border-pattern_filled.png';

export const StarBorder = css`
	border-image: url(${BorderPattern});
	border-image-slice: 100 fill;
	border-image-width: 10px;
`;

export const StarBorderFilled = css`
	border-image: url(${BorderPatternFilled});
	border-image-slice: 100 fill;
	border-image-width: 10px;
`;
