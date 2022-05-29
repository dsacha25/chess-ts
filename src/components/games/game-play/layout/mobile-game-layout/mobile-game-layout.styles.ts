import styled from 'styled-components';

export const MobileGameLayoutContainer = styled.div`
	width: 100vw;
	height: inherit;
	padding: 10px;
	overflow: hidden;
	position: fixed;
	top: 0;
	max-height: calc(100vh - 70px);

	@media screen and (max-width: 980px) {
		padding: 0;

		h2 {
			font-size: 18px !important;
		}
	}
`;
