import styled from 'styled-components';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import { ColumnsContainer } from '../../components/common/containers/grids/grids.styles';

export const HomePageContainer = styled.div`
	display: grid;
	width: 100vw;
	height: 80vh;

	place-items: center;
	place-content: center;
	grid-template-rows: 600px auto auto;
	grid-gap: 20px;
`;

export const HomeIconWrapper = styled.div`
	display: grid;
	place-items: center;
	border-radius: 300px;
	border: 6px solid black;
	width: 100%;
	max-width: 600px;
	height: 100%;
`;

export const ButtonsContainer = styled(ColumnsContainer)`
	max-width: 50vw;
`;

export const HomeActionButton = styled(CustomButton)`
	width: 350px;
	height: 60px;

	font-size: 22px;
	border-radius: 30px;
`;
