import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const MobileToolbarContainer = styled.div`
	display: grid;

	width: 100vw;
	height: 70px;
	overflow: hidden;

	position: fixed;

	bottom: 0;
	place-items: center;

	grid-template-columns: repeat(6, 1fr);

	background-color: ${({ theme }) => theme.light};
	z-index: 6;
`;

export const MobileToolbarButton = styled(CustomButton)`
	width: 100%;
	height: 70px;

	border-radius: 0;
	margin: 0;
	padding: 0;

	border: none !important;
`;

export const MobileLogoutContainer = styled.div`
	display: grid;
	width: 100vw;
	height: 40vh;

	padding: 30px 0;

	place-content: center;

	grid-template: 50% 1fr / 1fr;
	place-items: center;

	background-color: ${({ theme }) => theme.light};

	position: fixed;

	top: 20%;
	left: auto;
	right: auto;
	z-index: 20;
`;

export const MobileLogoutText = styled.p`
	font-size: 22px;
`;

export const MobileLogoutResponses = styled.div`
	display: grid;
	width: 80%;
	place-items: center;
	grid-template-columns: 1fr 1fr;

	button:first-of-type {
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
	}

	button:last-of-type {
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
	}
`;
