import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const SearchResultContainer = styled.div`
	display: grid;
	width: 100%;
	max-width: 40vw;
	height: 50px;

	margin-top: 10px;

	grid-template-columns: 1fr auto;

	border: 1px solid ${({ theme }) => theme.border};
	background-color: ${({ theme }) => theme.light};

	border-radius: 25px;
	place-content: center;
	place-items: center;
`;

export const EnemyName = styled.p`
	font-size: 20px;
	justify-self: flex-start;

	padding-left: 25px;
	color: ${({ theme }) => theme.main} !important;
`;

export const AddEnemyButton = styled(CustomButton)`
	width: 45px;
	height: 45px;
	margin: 0;
	margin-right: 1px;
	border-radius: 25px;
	place-content: center;
	place-items: center;
	color: ${({ theme }) => theme.main} !important;
`;
