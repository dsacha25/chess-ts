import styled from 'styled-components';

export const EnemiesContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	place-items: center;

	p {
		color: white;
		font-size: 20px;
		text-align: center;
	}

	grid-template-rows: auto auto auto 1fr;
`;

export const EnemySearchContainer = styled.div`
	display: grid;
	place-items: flex-start center;
	width: 100%;
`;
