import React, { FC, useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { blueGrey } from '@mui/material/colors';
import LineChartProps from './types';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const LineChart: FC<LineChartProps> = ({ title, labels, data }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: title,
			},
			subtitle: {
				display: true,
				text: 'Custom Chart Subtitle',
			},
			label: {
				display: false,
			},
		},
		scales: {
			y: {
				grace: 50,
			},
		},
	};

	const dataFormatted = {
		labels,
		datasets: [
			{
				label: 'Chess Rating',
				fill: true,
				data,
				borderColor: blueGrey[900],
				backgroundColor: `${blueGrey[600]}aa`,
				tension: 0.25,
			},
		],
	};

	return <Line options={options} data={dataFormatted} />;
};

export default LineChart;
