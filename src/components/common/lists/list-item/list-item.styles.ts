import styled from 'styled-components';

export interface ListItemProps {
	columns?: number;
}

export const ListItem = styled.li<ListItemProps>`
	display: grid;

	width: 100%;
	height: 60px;

	grid-template-columns: 1fr repeat(
			${({ columns }) => (columns ? columns : 2)},
			100px
		);

	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 30px;

	place-content: center;
	place-items: center flex-start;

	padding: 4px;
	grid-gap: 10px;
`;
