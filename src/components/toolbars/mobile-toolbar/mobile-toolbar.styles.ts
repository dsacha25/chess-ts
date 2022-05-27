import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const MobileToolbarContainer = styled.div`
	display: grid;

	width: 100vw;
	height: 70px;

	position: absolute;

	bottom: 0;
	place-items: center;

	grid-template-columns: repeat(5, 1fr);

	background-color: ${({ theme }) => theme.light};
`;

export const MobileToolbarButton = styled(CustomButton)`
	width: 100%;
	height: 70px;

	border-radius: 0;
	margin: 0;
`;
