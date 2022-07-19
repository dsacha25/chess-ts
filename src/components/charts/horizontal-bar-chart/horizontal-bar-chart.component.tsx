import React from 'react';
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
import CanvasJSReact from '../../../canvasjs-3.6.6/canvasjs.react';
import GameModeTypes from '../../../utils/types/chess/game-mode-type/game-mode-type';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const HorizontalBarChart = () => {
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
				text: 'Chart.js Horizontal Bar Chart',
			},
		},
	};

	const labels = [
		'Untimed',
		'5 minute',
		'5 | 5',
		'10 minute',
		'10 | 15',
		'1 Day',
		'3 Day',
	];

	const data = {
		labels,
		datasets: [
			{
				label: 'Game Types',
				data: [10, 1, 14, 4, 0, 7, 2],
				borderColor: 'rgb(34, 4, 4)',
				backgroundColor: 'rgb(191, 16, 16)',
			},
		],
	};

	return <Bar options={options} data={data} />;
};

export default HorizontalBarChart;
