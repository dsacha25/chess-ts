import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import Title from '../../common/title/title.styles';

export const BackdropContainer = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: 100vh;
	position: absolute;

	top: 0;
	left: 0;
	backdrop-filter: blur(5px);
	background-color: #33333344;
	z-index: 10;
`;

export const LoginModuleContainer = styled.form`
	display: grid;
	width: 55vw;
	height: 44vh;
	place-items: center;
	grid-template-rows: auto 1fr 1fr;
	border-radius: 60px;

	background-color: ${({ theme }) => theme.light};
	padding: 50px;
	place-self: center;

	z-index: 10;

	backdrop-filter: blur(20px);
`;

export const LoginTitle = styled(Title)`
	display: flex;
	font-weight: 200;
	justify-self: flex-start;
	font-size: 40px;

	gap: 40px;
`;

export const LogInButton = styled(CustomButton)`
	position: absolute;
	right: 2%;
	bottom: -3.5rem;
	justify-self: right;
	width: 25%;
	border-radius: 30px;
`;

export const CloseButton = styled(CustomButton)`
	width: 40px;
	height: 40px;
	place-items: center;
	border-radius: 20px;
	padding: 0;
`;
