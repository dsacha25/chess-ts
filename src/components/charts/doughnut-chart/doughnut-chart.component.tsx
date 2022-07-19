import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
	const data = {
		labels: ['Checkmate', 'Resignation', 'Abandonment', 'Timeout'],
		datasets: [
			{
				label: '# of Votes',
				data: [12, 19, 3, 5],
				backgroundColor: [
					'rgb(218, 17, 17)',
					'rgb(7, 156, 255)',
					'rgb(255, 183, 0)',
					'rgb(0, 255, 255)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return <Doughnut data={data} />;
};

export default DoughnutChart;
