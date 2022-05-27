import styled, { css } from 'styled-components';
import BaseButton from '../base-button/base-button.component';
import BaseButtonProps from '../base-button/types';

// import { buttonCleanStyles } from "../../base-styles/button-clean/button-clean.styles";
// import { circleRadius } from "../../base-styles/circle-radius/circle-radius.styles";

enum Size {
	value = '5.7vw',
	min = '70px',
	max = '120px',
}

const primary = '#818A99';
const secondary = '#C4CBD2';

const activeIconStyles = css`
	border: 3px solid ${({ theme }) => theme.main};

	.react-icons {
		color: ${({ theme }) => theme.main} !important;
	}
`;
const invertedActiveIconStyles = css`
	border: 3px solid ${({ theme }) => theme.main};
	background-color: ${({ theme }) => theme.main};
`;

const isIconButtonActive = ({ active }: BaseButtonProps) => {
	return active && activeIconStyles;
};
const isInvertIconButtonActive = ({ active }: BaseButtonProps) => {
	return active && invertedActiveIconStyles;
};

const iconStyles = css`
	${isIconButtonActive};

	&:hover {
		.react-icons {
			color: ${({ theme }) => theme.main};
		}
	}

	.react-icons {
		color: ${primary};
	}
`;

const invertedStyles = css`
	background-color: ${primary};
	${isInvertIconButtonActive};

	&:hover {
		background-color: ${({ theme }) => theme.main};
	}

	.react-icons {
		color: ${secondary};
	}
`;

const getIconStyles = ({ inverted }: BaseButtonProps) => {
	return inverted ? invertedStyles : iconStyles;
};

export const IconButtonMain = styled(BaseButton)<BaseButtonProps>`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${({ width }) => (width ? width : Size.value)};
	height: ${({ height }) => (height ? height : Size.value)};
	max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : Size.max)};
	max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : Size.max)};
	min-width: ${({ minWidth }) => (minWidth ? minWidth : Size.min)};
	min-height: ${({ minHeight }) => (minHeight ? minHeight : Size.min)};

	padding: 8px;

	border-radius: 30%;
	border: 3px solid ${primary};

	:hover {
		border: 3px solid ${({ theme }) => theme.main};
	}

	:focus {
		box-shadow: unset;
	}

	.react-icons {
		width: 100%;
		height: ${Size.value};
	}

	${getIconStyles};
`;
