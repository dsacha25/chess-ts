import styled from 'styled-components';

export const NotificationsContainer = styled.div`
	display: grid;
	width: 400px;
	height: 400px;
	place-content: flex-start stretch;
	border-radius: 25px;

	padding: 5px;

	color: black;

	background-color: ${({ theme }) => theme.white};
	border: 2px solid ${({ theme }) => theme.main};

	position: absolute;

	top: 30px;
	right: 30px;

	z-index: 0;

	overflow-y: auto;
`;
