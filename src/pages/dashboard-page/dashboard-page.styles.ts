import styled from 'styled-components';

export const DashboardContainer = styled.div`
	display: grid;
	width: 100vw;
	height: 100vh;
	padding: 80px;
	grid-template-columns: 300px 1fr;
	grid-gap: 40px;
	position: relative;

	@media screen and (max-width: 980px) {
		padding: 0;
		max-width: 100vw;
		/* overflow-x: hidden; */
		overflow: hidden;
	}
`;
