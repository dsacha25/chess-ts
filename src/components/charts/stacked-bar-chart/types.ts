interface StackedBarChartProps {
	title: string;
	labels: string[];
	data: { label: string; data: number[]; backgroundColor: string }[];
}

export default StackedBarChartProps;
