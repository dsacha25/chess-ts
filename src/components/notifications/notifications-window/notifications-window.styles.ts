import styled from 'styled-components';

export const NotificationsContainer = styled.div`
	display: grid;
	width: 300px;
	height: 400px;
	place-items: flex-start;
	border-radius: 25px;

	background-color: ${({ theme }) => theme.grey};
	border: 2px solid ${({ theme }) => theme.main};

	position: absolute;

	top: 30px;
	right: 30px;

	z-index: 0;
`;
