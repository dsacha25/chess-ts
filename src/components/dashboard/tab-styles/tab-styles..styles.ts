import styled from 'styled-components';
import Title from '../../common/title/title.styles';

export const TabTitle = styled(Title)`
	@media screen and (max-width: 980px) {
		font-size: 25px !important;
		margin: 0 !important;

		width: 100vw;
		height: 60px !important;

		text-align: center;
	}
`;

export const TabContent = styled.div`
	display: flex;
	flex-direction: column;

	width: inherit;
	height: 100%;

	place-items: center;

	overflow-y: auto;

	max-height: 90%;
`;
