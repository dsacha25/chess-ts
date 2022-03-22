import styled from 'styled-components';
import ImageContainer from '../common/containers/image-container/image-container.component';

export const HeaderContainer = styled.div`
	display: grid;
	height: 50px;
	width: 140px;

	border-radius: 40px;

	align-items: center;
	margin-right: 30px;
	flex: 1;
	max-width: 28%;
	position: absolute;
	right: 0;
	top: 20px;

	place-items: center;

	background-color: ${({ theme }) => theme.main};

	z-index: inherit;
	padding: 5px;
`;

export const Avatar = styled(ImageContainer)`
	width: 40px;
	height: 40px;
	border-radius: 25px;
	justify-self: flex-end;
`;
