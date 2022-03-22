import styled from 'styled-components';
import CustomButton from '../common/buttons/custom-button/custom-button.component';
import ImageContainer from '../common/containers/image-container/image-container.component';

export const HeaderContainer = styled.div`
	display: grid;
	height: 50px;
	width: 150px;

	grid-template-columns: 1fr auto;

	border-radius: 40px;
	margin-right: 30px;
	flex: 1;
	max-width: 28%;
	position: absolute;
	right: 0;
	top: 20px;

	place-items: center;
	place-content: center;

	background-color: ${({ theme }) => theme.main};

	z-index: inherit;
	padding: 4px;
`;

export const Avatar = styled(ImageContainer)`
	width: 42px;
	height: 42px;
	border-radius: 25px;
	/* justify-self: center flex-end; */

	grid-column: 2 / 3;

	z-index: 2;

	/* position: absolute; */

	transform: translate(-10px, 0);
`;

export const LogOutButton = styled(CustomButton)`
	width: 120px;
	height: 42px;

	background-color: ${({ theme }) => theme.accentBright};

	border-top-left-radius: 22px;
	border-bottom-left-radius: 22px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 0px;

	grid-column: 1 / 2;
	transform: translate(10px, 0);

	font-size: 10px;
	margin: 0;
	padding: 0;

	place-items: center flex-start;
	padding-left: 16px;

	z-index: 1;
`;
