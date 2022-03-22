import styled from 'styled-components';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import { RowsContainer } from '../../components/common/containers/grids/grids.styles';
import Title from '../../components/common/title/title.styles';

export const CreateAccountContainer = styled.form`
	display: grid;
	width: 60vw;
	height: 50vh;

	grid-template-columns: 1fr 250px;
	grid-template-rows: auto 1fr;
	place-items: center;
	position: relative;
	border-radius: 60px;

	background-color: ${({ theme }) => theme.light};

	padding: 50px;

	grid-column-gap: 60px;

	box-shadow: 0 10px 10px ${({ theme }) => theme.main};
`;

export const CreateAccountTitle = styled(Title)`
	grid-row: 1 / 2;
	justify-self: flex-start;
`;

export const NewCredentialsContainer = styled(RowsContainer)`
	grid-column: 1 / 2;
`;

export const SubmitButton = styled(CustomButton)`
	position: absolute;
	right: 2%;
	bottom: -3.5rem;
	justify-self: right;
	width: 30%;
	border-radius: 30px;
`;
