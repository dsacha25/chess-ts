import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const ChallengeItem = styled.div`
	display: grid;

	width: 100%;
	height: 60px;

	grid-template-columns: 1fr 1fr;

	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 30px;
	place-content: center;
	place-items: center flex-start;
	padding: 4px;

	@media screen and (max-width: 980px) {
		width: 100%;
		height: auto;
		grid-template: 1fr 1fr / 1fr;
	}
`;

export const EnemyInfo = styled.div`
	display: grid;
	width: 100%;

	place-items: center;
`;

export const EnemyName = styled.p`
	font-size: 20px;
	font-weight: 800;
	color: ${({ theme }) => theme.main} !important;
	margin-left: 25px;
`;

export const ChallengeResponses = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(2, 100px);
	place-content: center;
	place-items: center flex-start;

	@media screen and (max-width: 980px) {
	}
`;

export const AcceptChallengeButton = styled(CustomButton)`
	width: 100px;
	height: 50px;
	border-top-left-radius: 25px;
	border-bottom-left-radius: 25px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	margin: 0;
	place-content: center;
`;

export const RejectChallengeButton = styled(CustomButton)`
	width: 100px;
	height: 50px;
	border-radius: 25px;
	margin: 0;
	place-content: center;

	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 25px;
	border-bottom-right-radius: 25px;
`;
