import styled from 'styled-components';

export const EnemiesContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	place-items: center;

	grid-template-rows: auto auto auto 1fr;

	@media screen and (max-width: 980px) {
		display: flex;
		width: 100vw;
		overflow-y: auto;
		flex-direction: column;
		height: calc(100vh - 70px);
		justify-content: space-between;
	}
`;

export const EnemySearchContainer = styled.div`
	display: grid;
	place-items: flex-start center;
	width: 100%;

	@media screen and (max-width: 980px) {
		max-width: 40vw;
		place-content: center;
	}
`;
