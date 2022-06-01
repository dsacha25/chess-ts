import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const SearchResultContainer = styled.div`
	display: grid;
	width: 100%;
	max-width: 40vw;
	height: 50px;

	margin-top: 10px;

	grid-template-columns: 1fr auto;
	gap: 5px;

	white-space: nowrap;

	border: 1px solid ${({ theme }) => theme.border};
	background-color: ${({ theme }) => theme.white};

	border-radius: 0.5rem;
	place-content: center;
	place-items: center;

	@media screen and (max-width: 980px) {
		max-width: 86vw;
	}
`;

export const EnemyName = styled.p`
	font-size: 16px;
	justify-self: flex-start;

	padding-left: 25px;
	color: ${({ theme }) => theme.main} !important;
	overflow: hidden;
	font-weight: 200;

	@media screen and (max-width: 980px) {
		font-size: 0.8rem;
	}
`;

export const AddEnemyButton = styled(CustomButton)`
	width: 44px;
	height: 44px;
	margin: 0;
	margin-right: 2px;
	border-radius: 0.4rem;
	place-content: center;
	place-items: center;
	color: ${({ theme }) => theme.main} !important;
`;
