import styled from 'styled-components';

interface GridContainerProps {
	columns?: number;
	rows?: number;
	gridGap?: string;
}

export const BaseContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	place-items: center;
`;

export const ContainerColumnsRight = styled(BaseContainer)<GridContainerProps>`
	grid-template-columns:
		repeat(${({ columns }) => (columns ? columns : 1)}, auto)
		1fr;
	grid-gap: ${({ gridGap }) => gridGap};
`;

export const ContainerColumnsLeft = styled(BaseContainer)<GridContainerProps>`
	grid-template-columns: 1fr repeat(
			${({ columns }) => (columns ? columns : 1)},
			auto
		);
	grid-gap: ${({ gridGap }) => gridGap};
`;

export const RowsContainer = styled(BaseContainer)<GridContainerProps>`
	grid-template-rows: repeat(${({ rows }) => (rows ? rows : 2)}, 1fr);
	grid-gap: ${({ gridGap }) => gridGap};
`;

export const ColumnsContainer = styled(BaseContainer)<GridContainerProps>`
	grid-template-columns: repeat(
		${({ columns }) => (columns ? columns : 2)},
		1fr
	);

	grid-gap: ${({ gridGap }) => gridGap};
`;
