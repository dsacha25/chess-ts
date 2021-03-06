import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const EnemyContainer = styled.div`
	display: grid;

	width: 100%;
	height: 60px;

	grid-template-columns: auto 1fr 100px;

	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 0.5rem;
	place-content: center;
	place-items: center flex-start;
	padding: 4px;
	grid-gap: 10px;
`;

export const EnemyName = styled.p`
	font-size: 20px;
	font-weight: 800;
	color: ${({ theme }) => theme.main} !important;
	margin-left: 25px;

	@media screen and (max-width: 980px) {
		font-size: 1rem;
		white-space: nowrap;
		overflow: auto;
	}
`;

export const EnemyRating = styled.p`
	font-size: 18px;
	font-weight: 200;
	color: ${({ theme }) => theme.grey};

	@media screen and (max-width: 980px) {
		font-size: 0.8rem;
	}
`;

export const ChallengeButton = styled(CustomButton)`
	width: 100%;
	height: 50px;
	border-radius: 0.4rem !important;
	margin: 0;
	place-content: center;
`;
