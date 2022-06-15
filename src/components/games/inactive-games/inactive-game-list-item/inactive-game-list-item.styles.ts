import styled from 'styled-components';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';

export const InactiveGameAnalysisButton = styled(CustomButton)`
	width: 100%;
	height: 50px;
	border-radius: 0.4rem;
	margin: 0;
	place-content: center;
`;

export const GameDate = styled.p`
	color: ${({ theme }) => theme.main};

	@media screen and (max-width: 980px) {
		display: none;
	}
`;
