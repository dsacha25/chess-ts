import styled from 'styled-components';
import CustomButton from '../common/buttons/custom-button/custom-button.component';

export const AuxiliaryPanelContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	place-items: flex-start;

	background-color: ${({ theme }) => theme.accentBright};

	padding: 30px;
	border-radius: 40px;

	grid-template-rows: auto 1fr auto;

	color: ${({ theme }) => theme.main};

	h2 {
		color: ${({ theme }) => theme.main};
	}

	grid-gap: 20px;
`;

export const PanelInfoContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	border-radius: 20px;

	border-top: 2px solid ${({ theme }) => theme.main};
	border-bottom: 2px solid ${({ theme }) => theme.main};
	border-left: 1px solid ${({ theme }) => theme.main}55;
	border-right: 1px solid ${({ theme }) => theme.main}55;
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

export const ConfirmMoveContainer = styled.div`
	display: grid;
	width: 100%;
	height: 60px;
	grid-template-columns: 1fr 1fr;
	place-items: center;
`;

export const ConfirmMoveButton = styled(CustomButton)`
	width: 100%;
	height: 60px;

	border-top-left-radius: 30px;
	border-bottom-left-radius: 30px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 0px;

	place-content: center;
`;

export const RejectMoveButton = styled(CustomButton)`
	width: 100%;
	height: 60px;

	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	border-top-right-radius: 30px;
	border-bottom-right-radius: 30px;

	place-content: center;
`;
