import styled from 'styled-components';
import CustomButton from '../common/buttons/custom-button/custom-button.component';

export const ToolbarContainer = styled.div`
	display: grid;
	place-items: center flex-start;
	width: 100%;
	height: 60%;
	grid-template-rows: repeat(6, 1fr);

	position: relative;
`;

export const ToolbarButton = styled(CustomButton)`
	width: 160px;
	height: 50px;
	border-radius: 25px;
	font-size: 14px;
	z-index: 1;
`;

export const AestheticBar = styled.div`
	width: 50px;
	height: 90%;
	min-height: 430px;

	top: 50px;
	left: 10px;

	border-radius: 25px;
	z-index: 0;

	position: absolute;

	background-color: ${({ theme }) => theme.main}aa;
`;
