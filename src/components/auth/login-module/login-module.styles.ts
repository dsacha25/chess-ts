import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import Title from '../../common/title/title.styles';

export const BackdropContainer = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: calc(100vh - 70px);
	position: absolute;

	top: 0;
	left: 0;
	backdrop-filter: blur(5px);
	background-color: #33333344;
	z-index: 10;

	overflow: hidden;
`;

export const LoginModuleContainer = styled.form`
	display: grid;
	width: 55vw;
	height: 44vh;
	place-items: center;
	grid-template-rows: auto 1fr 1fr auto;
	border-radius: 60px;

	background-color: ${({ theme }) => theme.light};
	padding: 50px;
	place-self: center;

	z-index: 10;

	backdrop-filter: blur(20px);

	p {
		font-size: 12px;
		font-weight: 300;
		text-align: center;
		text-transform: uppercase;
	}

	@media screen and (max-width: 980px) {
		width: 100vw;
		height: 50vh;
		grid-template-rows: 40px repeat(4, auto);
		border-radius: 0;
		padding: 20px;
		margin-top: 10vh;
		place-self: flex-start;
	}
`;

export const LoginTitle = styled(Title)`
	display: flex;
	font-weight: 200;
	justify-self: flex-start;
	font-size: 40px;

	gap: 40px;

	@media screen and (max-width: 980px) {
		font-size: 20px;

		gap: unset;
	}
`;

export const LogInButton = styled(CustomButton)`
	position: absolute;
	right: 2%;
	bottom: -3.5rem;
	justify-self: right;
	width: 25%;
	border-radius: 30px;

	@media screen and (max-width: 980px) {
		position: unset;
		width: 100%;
		right: unset;
		bottom: unset;
		margin: 0;
	}
`;

export const CloseButton = styled(CustomButton)`
	width: 40px;
	height: 40px;
	place-items: center;
	border-radius: 20px;
	padding: 0;
`;
