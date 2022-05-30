import styled from 'styled-components';
import { StarBorderFilled } from '../../components/common/border-styles/border-styles';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import Title from '../../components/common/title/title.styles';

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
