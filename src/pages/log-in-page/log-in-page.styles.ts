import styled from 'styled-components';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import Title from '../../components/common/title/title.styles';

export const LogInContainer = styled.form`
	display: grid;
	width: 50vw;
	height: 44vh;
	place-items: center;
	grid-template-rows: auto 1fr 1fr;
	border-radius: 60px;
	position: relative;
	background-color: ${({ theme }) => theme.light};
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
	font-weight: 200;
	justify-self: flex-start;
`;

export const LogInButton = styled(CustomButton)`
	position: absolute;
	right: 2%;
	bottom: -3.5rem;
	justify-self: right;
	width: 25%;
	border-radius: 30px;

	@media screen and (max-width: 980px) {
		width: auto;
		justify-self: center;
		position: unset;
		right: unset;
		bottom: unset;
	}
`;
