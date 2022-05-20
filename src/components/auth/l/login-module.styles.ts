import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import Title from '../../common/title/title.styles';

export const LoginModuleContainer = styled.form`
	display: grid;
	width: 50vw;
	height: 44vh;
	place-items: center;
	grid-template-rows: auto 1fr 1fr;
	border-radius: 60px;
	position: relative;
	background-color: ${({ theme }) => theme.light};
	padding: 50px;
`;

export const LoginTitle = styled(Title)`
	font-weight: 200;
	justify-self: flex-start;
	/* font-size: 30px; */
`;

export const LogInButton = styled(CustomButton)`
	position: absolute;
	right: 2%;
	bottom: -3.5rem;
	justify-self: right;
	width: 25%;
	border-radius: 30px;
`;
