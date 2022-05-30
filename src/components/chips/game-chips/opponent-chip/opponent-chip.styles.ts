import styled from 'styled-components';
import ImageContainer from '../../../common/containers/image-container/image-container.component';

export const OpponentChipContainer = styled.div`
	display: grid;
	width: 260px;
	height: 100%;

	position: relative;
	place-items: flex-end center;
`;

export const OpponentChipAvatar = styled(ImageContainer)`
	width: 54px;
	height: 54px;
	border-radius: 30px;
	justify-self: flex-start;
	z-index: 1;
	border: 2px solid ${({ theme }) => theme.main};
	background-color: ${({ theme }) => theme.main};
`;

export const OpponentChipInfo = styled.div`
	display: grid;
	width: inherit;
	height: 40px;
	justify-self: flex-end;
	place-items: center flex-end;

	grid-template-columns: 1fr auto;
	grid-gap: 10px;
	padding: 0 18px;

	position: absolute;
	left: 30px;

	color: ${({ theme }) => theme.light};
	background-color: ${({ theme }) => theme.secondary};
	border: 1px solid ${({ theme }) => theme.main};

	border-top-right-radius: 20px;
	border-bottom-right-radius: 20px;

	z-index: 0;
`;

export const OpponentUserName = styled.p`
	font-weight: 200;
	font-size: 14px;
	margin: 0;
	color: ${({ theme }) => theme.white};
`;

export const ChipRating = styled.p`
	font-weight: 600;
	font-size: 16px;
	margin: 0;
	color: ${({ theme }) => theme.white};
`;
