import styled from 'styled-components';

const GenericContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	place-items: center;
	padding: 12px;

	border: 3px solid ${({ theme }) => theme.borderColor};
	border-radius: 22px;

	scroll-snap-align: center;
`;

export default GenericContainer;
