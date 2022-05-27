import styled from 'styled-components';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import { RowsContainer } from '../../components/common/containers/grids/grids.styles';
import Title from '../../components/common/title/title.styles';

export const CreateAccountContainer = styled.form`
	display: grid;
	width: 80vw;
	height: 60vh;

	grid-template-columns: 1fr 250px;
	grid-template-rows: auto 1fr;
	place-items: center;
	place-content: center;
	place-self: flex-start center;
	border-radius: 60px;

	margin-top: 40px;
	padding: 50px;

	background-color: ${({ theme }) => theme.light};

	grid-column-gap: 60px;

	position: relative;

	box-shadow: 0 10px 10px ${({ theme }) => theme.main};

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
	grid-row: 1 / 2;
	justify-self: flex-start;

	@media screen and (max-width: 980px) {
		font-size: 24px;
	}
`;

export const NewCredentialsContainer = styled(RowsContainer)`
	grid-column: 1 / 2;
	max-width: 90vw;

	@media screen and (max-width: 980px) {
		grid-template-rows: repeat(${({ rows }) => (rows ? rows : 2)}, auto);

		gap: 30px;

		div {
			grid-template-columns: unset;
			grid-template-rows: repeat(
				${({ columns }) => (columns ? columns : 2)},
				auto
			);
		}
	}
`;

export const SubmitButton = styled(CustomButton)`
	position: absolute;
	right: 2%;
	bottom: -3.5rem;
	justify-self: right;
	width: 30%;
	border-radius: 30px;

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
