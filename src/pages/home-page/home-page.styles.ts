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

	@media screen and (max-width: 980px) {
		grid-template-rows: repeat(3, auto);

		h2 {
			font-size: 40px;
			white-space: normal;
			text-align: center;
		}
	}

	@media screen and (max-height: 850px) {
		grid-template-rows: repeat(3, auto);
	}
`;

export const HomeIconWrapper = styled.div`
	display: grid;
	place-items: center;
	border-radius: 100%;
	border: 15px solid #6b001d;
	width: 100%;
	max-width: 600px;
	height: 100%;
	overflow: hidden;

	@media screen and (max-width: 980px) {
		width: 60vw;
		max-width: unset;
		height: 60vw;

		border-width: 7px;
	}

	@media screen and (max-height: 850px) {
		width: 300px;
		max-width: unset;
		height: 300px;
		border-width: 7px;
	}
`;

export const ButtonsContainer = styled(ColumnsContainer)`
	max-width: 80vw;

	@media screen and (max-width: 980px) {
		grid-template: 1fr 1fr / 1fr;
		max-width: unset;
	} ;
`;

export const HomeActionButton = styled(CustomButton)`
	width: 350px;
	height: 60px;

	font-size: 22px;
	border-radius: 30px;
`;
