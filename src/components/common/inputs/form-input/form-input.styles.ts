import styled, { css } from 'styled-components';
import { FormInputProps } from './types';

const secondary = '#b6babd';

const errorStyles = css`
	background-color: #ffe9e9 !important;
	border-color: #ff3636 !important;
	outline: 0;
	box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.4) !important;
`;

const labelStyles = css`
	display: unset;
	align-items: unset;
	top: -20px;
	font-size: 16px;
	font-weight: 600;
	color: ${({ theme }) => theme.secondary};
	font-family: 'Lexend Peta', sans-serif;
`;

export const FormInputWrapper = styled.div<FormInputProps>`
	display: inline;
	position: relative;
	flex: 1;
	width: 100%;
	margin: ${({ margin }) => margin};

	input[type='password'] {
		letter-spacing: 0.3rem;
		font-size: 36px;
	}
`;

export const FormInputComponent = styled.input<FormInputProps>`
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 2rem;
	border: 1px solid ${secondary};
	background: ${({ theme }) => theme.white};
	color: ${({ theme }) => theme.main};
	padding: 10px 25px;
	max-width: -webkit-fill-available;

	font-family: 'Lexend Peta', sans-serif;
	font-size: 26px;
	font-weight: 400;
	font-style: italic;
	letter-spacing: 0.15rem;
	line-height: 2rem;

	pointer-events: ${({ noClick }) => noClick && 'none'};
	cursor: pointer;

	${({ error }) => error && errorStyles}

	::placeholder {
		color: ${secondary};
		font-size: 1.25rem;
	}

	:focus {
		outline: none;
		background-color: #fff;
		border-color: #80bdff;
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}

	:focus ~ label {
		${labelStyles}
	}

	:disabled {
		background: #44444422;
		border-bottom: unset;
		cursor: unset;
	}

	::-webkit-calendar-picker-indicator {
		cursor: pointer;
	}
`;

export const InputLabel = styled.label`
	display: flex;
	align-items: center;
	color: ${secondary};
	font-size: 22px;
	font-weight: 200;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 20px;
	font-style: italic;
	letter-spacing: 0.15rem;
	pointer-events: none;
	transition: 300ms ease all;

	&.shrink {
		${labelStyles}
	}
`;
