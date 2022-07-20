import styled from 'styled-components';

export const DashboardContainer = styled.div`
	display: grid;
	width: 100vw;
	height: 100vh;
	padding: 0 40px;
	grid-template-columns: 300px 1fr;
	grid-gap: 40px;
	position: relative;

	@media screen and (max-width: 980px) {
		grid-template-columns: unset;
		padding: 0;
		max-width: 100vw;
		height: 100%;
		overflow: hidden;
	}
`;
