import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const EnemyRequestContainer = styled.div`
	display: grid;

	width: 100%;
	height: 60px;

	grid-template-columns: 1fr 50px 50px;

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
`;

export const RequestResponseButton = styled(CustomButton)`
	width: 50px;
	height: 50px;
	border-radius: 0.4rem;
	margin: 0;
	place-content: center;
`;
