import styled from 'styled-components';

export const InactiveGamesStatsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
`;

export const GameStats = styled.div`
	display: grid;
	font-size: 20px;
	font-weight: 600;

	grid-template-columns: repeat(3, 1fr);

	gap: 10px;
`;

export const Stat = styled.p`
	display: grid;
	place-content: center;
	place-items: center;

	grid-template-columns: auto auto;
	gap: 2px;

	color: ${({ theme }) => theme.main};
`;
