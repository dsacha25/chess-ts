import React, { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DoughnutChartProps from './types';
import { DoughnutContainer } from './doughnut-chart.styles';
import { blueGrey } from '@mui/material/colors';
import ColorIndexes from '../../../utils/types/util/color-indexes/color-indexes';
import { floor } from 'lodash';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: FC<DoughnutChartProps> = ({ title, data, labels }) => {
	const dataFormatted = {
		labels,
		datasets: [
			{
				label: '# of Votes',
				data,
				backgroundColor: data.map((value, i) => {
					const color = floor(
						900 - (900 / data.length) * i,
						-2
					) as ColorIndexes;
					return blueGrey[color];
				}),
				borderColor: 'black',
				borderWidth: 1,
			},
		],
	};

	return (
		<DoughnutContainer>
			<Doughnut data={dataFormatted} options={{ radius: 100 }} />
		</DoughnutContainer>
	);
};

export default DoughnutChart;
