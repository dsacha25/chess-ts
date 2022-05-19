import styled from 'styled-components';

export const StatsContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	place-items: center;

	p {
		text-align: center;
		font-size: 20px;
	}

	grid-template-rows: 1fr auto auto 1fr;
`;
