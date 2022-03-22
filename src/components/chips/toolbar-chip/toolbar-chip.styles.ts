import styled from 'styled-components';
import ImageContainer from '../../common/containers/image-container/image-container.component';

export const ToolbarChipContainer = styled.div`
	display: grid;
	width: 200px;
	height: 60px;

	position: relative;
`;

export const ChipAvatar = styled(ImageContainer)`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	justify-self: flex-start;
	z-index: 1;
`;

export const ChipInfoContianer = styled.div`
	display: grid;
	width: 100%;
	height: 75%;
	justify-self: flex-end;
	place-items: center;

	color: ${({ theme }) => theme.light};
	background-color: ${({ theme }) => theme.main};
	border-radius: 20px;

	z-index: 0;
`;
