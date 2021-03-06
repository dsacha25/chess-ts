import styled from 'styled-components';

export const StatsContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	max-height: 100vh;

	place-items: center;

	p {
		text-align: center;
		font-size: 20px;
	}

	grid-template-rows: auto 1fr;

	@media screen and (max-width: 980px) {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		padding: 0 20px 20px 20px;

		p {
			font-size: unset;
		}
	}
`;

export const StatsData = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	max-height: 83vh;

	overflow-y: auto;

	gap: 60px;

	place-items: center;

	padding-bottom: 80px;
`;
