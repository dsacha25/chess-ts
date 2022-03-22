import styled from 'styled-components';
import CustomButton from '../common/buttons/custom-button/custom-button.component';

export const ToolbarContainer = styled.div`
	display: grid;
	place-items: center flex-start;
	width: 100%;
	height: 70%;
	grid-template-rows: repeat(4, 1fr);
`;

export const ToolbarButton = styled(CustomButton)`
	width: 200px;
	height: 40px;
	border-radius: 20px;
	font-size: 15px;
`;
