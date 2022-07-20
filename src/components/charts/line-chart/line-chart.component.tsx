import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { blueGrey } from '@mui/material/colors';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineChart = () => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart',
			},
		},
	};

	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
	];

	const data = {
		labels,
		datasets: [
			{
				label: 'Rating',
				data: [800, 600, 1200, 1150, 1100, 1400, 1320],
				borderColor: blueGrey[900],
				backgroundColor: blueGrey[900],
			},
		],
	};

	return <Line options={options} data={data} />;
};

export default LineChart;
