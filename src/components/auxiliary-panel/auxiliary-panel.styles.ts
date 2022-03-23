import styled from 'styled-components';

export const AuxiliaryPanelContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	place-items: flex-start;

	background-color: ${({ theme }) => theme.main};

	padding: 40px;
	border-radius: 40px;

	grid-template-rows: auto 1fr 1fr;

	p {
		color: white;
	}
`;
