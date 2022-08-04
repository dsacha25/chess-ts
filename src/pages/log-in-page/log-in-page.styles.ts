import styled from 'styled-components';
import { StarBorderFilled } from '../../components/common/border-styles/border-styles';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import Title from '../../components/common/title/title.styles';
import { gb_disabled, gb_normal, gb_pressed } from '../../assets/google-button';

export const LogInContainer = styled.form`
	display: grid;
	width: 55vw;
	min-height: 450px;
	place-items: center;
	grid-template-rows: auto 1fr 1fr;
	border-radius: 60px;
	position: relative;
	margin: 0 10%;

	${StarBorderFilled};

	padding: 50px;

	@media screen and (max-width: 980px) {
		width: 100vw;
		height: 100vh;

		grid-template-rows: auto 100px auto auto 1fr;

		gap: 20px;

		border-radius: 0px;
		padding: 15px;
		margin: unset;

		box-shadow: unset;
	}
`;

export const LoginTitle = styled(Title)`
	font-size: 40px;
	grid-row: 1 / 2;
	margin: 0;

	@media screen and (max-width: 980px) {
		margin: 50px 0;

		font-size: 30px;
		place-self: unset;
	}
`;

export const LogInButton = styled(CustomButton)`
	position: absolute;
	right: 2%;
	bottom: -3.5rem;
	justify-self: right;
	width: 25%;
	border-radius: 6px;

	@media screen and (max-width: 980px) {
		width: auto;
		justify-self: center;
		position: unset;
		right: unset;
		bottom: unset;
	}
`;

export const GoogleLogInButton = styled.button`
	width: 185px;
	height: 41px;
	border-radius: 1px;
	padding: 0;
	align-self: left;

	cursor: pointer;

	background-color: transparent;
	background-image: url(${gb_normal});
	background-position: center;
	border: none;
	outline: none;
	background-repeat: no-repeat;

	box-shadow: 0 2px 8px -1px #a9a9a9;

	justify-self: left;

	:focus {
		border-color: #80bdff;
		outline: 0;
		box-shadow: 0 0 1px 0.2rem rgba(63, 129, 238, 0.25);
	}

	:disabled {
		background-image: url(${gb_disabled});
	}

	:active {
		background-image: url(${gb_pressed});
		box-shadow: 0 2px 8px -1px #828282;
	}
`;
