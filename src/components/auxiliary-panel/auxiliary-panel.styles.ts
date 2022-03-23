import styled from 'styled-components';
import CustomButton from '../common/buttons/custom-button/custom-button.component';

export const AuxiliaryPanelContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	place-items: flex-start;

	background-color: ${({ theme }) => theme.main};

	padding: 30px;
	border-radius: 40px;

	grid-template-rows: auto 1fr auto;

	color: white;

	grid-gap: 20px;
`;

export const PanelInfoContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	border-radius: 20px;

	border-top: 2px solid ${({ theme }) => theme.light};
	border-bottom: 2px solid ${({ theme }) => theme.light};
	border-left: 1px solid ${({ theme }) => theme.grey};
	border-right: 1px solid ${({ theme }) => theme.grey};
`;

export const PanelControlsContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	padding: 0 10px;

	max-width: 340px;

	grid-template-columns: 1fr 1fr 50px;

	border-radius: 30px;

	place-items: flex-start space-between;

	grid-gap: 20px;
`;

export const PanelButton = styled(CustomButton)`
	width: 100%;
	padding: unset;
	height: 50px;
	font-size: 15px;
	margin: 0;

	border-radius: 25px;

	svg {
		margin-top: 2px;
	}
`;
