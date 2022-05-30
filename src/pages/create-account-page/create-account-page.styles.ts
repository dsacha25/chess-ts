import styled from 'styled-components';
import { StarBorderFilled } from '../../components/common/border-styles/border-styles';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import { RowsContainer } from '../../components/common/containers/grids/grids.styles';
import Title from '../../components/common/title/title.styles';

export const CreateAccountContainer = styled.form`
	display: grid;
	height: 50vh;
	min-height: 450px;
	margin: 0 20%;

	grid-template-columns: 1fr 250px;
	grid-template-rows: auto 1fr;
	place-items: center;
	place-content: center;
	place-self: center;

	padding: 50px;

	grid-column-gap: 60px;

	position: relative;

	${StarBorderFilled};
	filter: drop-shadow(0 5px 5px ${({ theme }) => theme.main}80);

	/* background-color: ${({ theme }) => theme.light}; */
	/* box-shadow: 0px 20px 10px ${({ theme }) => theme.main}; */

	@media screen and (max-width: 980px) {
		width: 100vw;
		height: 100vh;

		grid-template: auto 1fr 1fr / 1fr;

		gap: 20px;

		border-radius: 0px;
		padding: 15px;
		margin: unset;

		box-shadow: unset;
	}
`;

export const CreateAccountTitle = styled(Title)`
	font-size: 40px;
	grid-row: 1 / 2;
	place-self: flex-start;
	margin-bottom: 0;

	@media screen and (max-width: 980px) {
		margin-bottom: 50px;

		font-size: 25px;
		place-self: unset;
	}
`;

export const NewCredentialsContainer = styled(RowsContainer)`
	grid-column: 1 / 2;
	max-width: 90vw;
	height: 70%;
	grid-template-rows: repeat(3, auto);
	grid-template-columns: 1fr 1fr;

	column-gap: 30px;

	div {
		grid-column: 1 / span 2;
	}

	.password {
		grid-column: unset;
	}

	@media screen and (max-width: 980px) {
		grid-template-rows: unset;
		height: 100%;

		gap: 10px;
		place-items: flex-end;

		.password {
			grid-column: 1 / span 2;
		}
	}
`;

export const PasswordContainer = styled.div`
	grid-template-columns: repeat(3, 1fr);
`;

export const SubmitButton = styled(CustomButton)`
	position: absolute;
	right: 2%;
	bottom: -3.5rem;
	justify-self: right;
	width: 25%;
	border-radius: 5px;

	@media screen and (max-width: 980px) {
		position: unset;
		width: 70%;
		font-size: 14px;
		right: unset;
		bottom: unset;
		justify-self: center;
		height: 50px;
	}
`;

export const ErrorText = styled.p`
	color: ${({ theme }) => theme.warn};

	font-size: 14px;
	text-align: center;

	@media screen and (max-width: 980px) {
		font-size: 10px;
	}
`;
