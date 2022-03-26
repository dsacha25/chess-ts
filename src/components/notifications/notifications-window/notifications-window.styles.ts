import styled from 'styled-components';

export const NotificationsContainer = styled.div`
	display: grid;
	width: 300px;
	height: 400px;
	place-content: flex-start stretch;
	border-radius: 25px;

	color: black;

	background-color: ${({ theme }) => theme.white};
	border: 2px solid ${({ theme }) => theme.main};
	border-top-right-radius: 0;
	border-bottom-right-radius: 4px;

	position: absolute;

	top: 30px;
	right: 30px;

	z-index: 0;

	/* overflow: hidden; */

	overflow-y: auto;
`;
