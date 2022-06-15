import styled from 'styled-components';

export const NotificationsContainer = styled.div`
	display: grid;
	width: 500px;
	height: 600px;
	place-content: flex-start stretch;
	border-radius: 0.5rem;

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
