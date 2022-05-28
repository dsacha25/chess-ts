import styled from 'styled-components';

export const EnemyListContainer = styled.div`
	display: grid;
	width: 60vw;
	height: 600px;
	place-content: flex-start stretch;
	grid-gap: 10px;
	margin: 10px;

	@media screen and (max-width: 980px) {
		width: 95vw;
	}
`;
