import styled from 'styled-components';

export const InactiveGamesStatsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	max-width: 100vw;

	@media screen and (max-width: 980px) {
		grid-template: 30px 30px / 1fr;

		margin-bottom: 20px;
	}
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
