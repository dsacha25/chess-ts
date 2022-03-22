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

	grid-template-rows: 1fr auto auto 1fr;
`;
