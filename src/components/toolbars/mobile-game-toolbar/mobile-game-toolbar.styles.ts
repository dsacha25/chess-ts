import styled from 'styled-components';

export const MobileGameToolbarContainer = styled.div`
	display: grid;

	width: 100vw;
	height: 70px;
	overflow: hidden;

	position: fixed;

	bottom: 0;
	place-items: center;

	grid-template-columns: repeat(3, 1fr);

	background-color: ${({ theme }) => theme.light};
	z-index: 3;
`;
