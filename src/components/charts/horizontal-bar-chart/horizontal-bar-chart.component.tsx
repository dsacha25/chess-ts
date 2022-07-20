import React, { FC } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { blueGrey } from '@mui/material/colors';
import HorizontalBarChartProps from './types';
import ColorIndexes from '../../../utils/types/util/color-indexes/color-indexes';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const HorizontalBarChart: FC<HorizontalBarChartProps> = ({
	title,
	labels,
	data,
}) => {
	const options = {
		indexAxis: 'y' as const,
		elements: {
			bar: {
				borderWidth: 1,
				borderRadius: 10,
			},
		},
		responsive: true,
		plugins: {
			legend: {
				position: 'right' as const,
			},
			title: {
				display: true,
				text: title,
			},
		},
	};

	const dataFormatted = {
		labels,
		datasets: data.map((value, i) => {
			const color = (900 - i * 100) as ColorIndexes;

			// return blueGrey[color];

			let zeroPadding: number[] = [];

			for (let index = 0; index < i; index++) {
				zeroPadding.unshift(0);
			}

			return {
				label: labels[i],
				data: [...zeroPadding, data[i]],
				borderColor: blueGrey[color],
				backgroundColor: blueGrey[color],
				stack: '1',
			};
		}),
	};

	return <Bar options={options} data={dataFormatted} />;
};

export default HorizontalBarChart;
