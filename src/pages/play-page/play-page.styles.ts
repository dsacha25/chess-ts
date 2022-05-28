import styled from 'styled-components';

export const PlayContainer = styled.div`
	display: grid;
	width: 100vw;
	height: 100vh;
	padding: 40px 80px;
	grid-template-columns: 100px 1fr 400px;
	position: relative;
	grid-gap: 50px;

	@media screen and (max-width: 980px) {
		grid-template-columns: 1fr;
		padding: 0;
	}
`;
