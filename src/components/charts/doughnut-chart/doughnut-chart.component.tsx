import React, { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Color } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DoughnutChartProps from './types';
import { ChartTitle, DoughnutContainer } from './doughnut-chart.styles';
import * as Colors from '@mui/material/colors';
import ColorIndexes from '../../../utils/types/util/colors/color-indexes/color-indexes';
import { floor } from 'lodash';
import allMUIColors from '../../../utils/types/util/colors/mui-colors/mui-colors';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: FC<DoughnutChartProps> = ({
	title,
	data,
	labels,
	colorName,
}) => {
	const dataFormatted = {
		labels,
		datasets: [
			{
				data,
				backgroundColor: data.map((value, i) => {
					const c = allMUIColors[colorName];
					const color = floor(
						900 - (900 / data.length) * i,
						-2
					) as ColorIndexes;
					return c[color];
				}),
				borderColor: 'black',
				borderWidth: 0,
			},
		],
	};

	return (
		<DoughnutContainer>
			<ChartTitle>{title}</ChartTitle>
			<Doughnut data={dataFormatted} options={{ radius: 85 }} />
		</DoughnutContainer>
	);
};

export default DoughnutChart;
