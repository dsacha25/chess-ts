import styled from 'styled-components';

export const ChallengesListContainer = styled.div`
	display: grid;
	width: 60vw;
	height: 600px;
	place-content: flex-start stretch;
	grid-gap: 10px;
	margin: 10px;

	@media screen and (max-width: 980px) {
		width: 100%;
		margin: 0;

		padding: 10px;
	}
`;
