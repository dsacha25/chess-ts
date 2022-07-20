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
import StackedBarChartProps from './types';
import { blueGrey } from '@mui/material/colors';
import ColorIndexes from '../../../utils/types/util/color-indexes/color-indexes';
import { floor } from 'lodash';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const StackedBarChart: FC<StackedBarChartProps> = ({ title, labels, data }) => {
	const options = {
		plugins: {
			title: {
				display: true,
				text: title,
			},
		},
		responsive: true,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
	};

	/* 
    datasets: [
			{
				label: 'Dataset 1',
				data: [20, 50, 40, 10],
				backgroundColor: blueGrey[900],
			},
			{
				label: 'Dataset 2',
				data: [60, 20, 10, 60],
				backgroundColor: blueGrey[300],
			},
			{
				label: 'Dataset 3',
				data: [20, 30, 50, 30],
				backgroundColor: blueGrey[600],
			},
		],
    */

	const dataFormatted = {
		labels,
		datasets: data,
	};

	return <Bar options={options} data={dataFormatted} />;
};

export default StackedBarChart;
