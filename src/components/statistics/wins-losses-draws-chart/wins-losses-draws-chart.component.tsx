import React, { FC, useEffect, useState } from 'react';
import { format, isSameMonth, subMonths } from 'date-fns';
import { filter, forEach } from 'lodash';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectUserUID } from '../../../redux/user/user.selector';
import { ChessGameType } from '../../../utils/types/chess/chess-game-type/chess-game-type';
import StackedBarChart from '../../charts/stacked-bar-chart/stacked-bar-chart.component';
import WinsLossesDrawsProps from './types';
import { blueGrey } from '@mui/material/colors';
import { StatsContainer } from '../statistics-styles/statistics-styles.styles';

const WinsLossesDrawsChart: FC<WinsLossesDrawsProps> = ({ games }) => {
	const uid = useSelector((state) => selectUserUID(state));
	const [wins, setWins] = useState<number[]>([]);
	const [draws, setDraws] = useState<number[]>([]);
	const [losses, setLosses] = useState<number[]>([]);
	const [labels, setLabels] = useState<string[]>([]);

	const [timeSpan, setTimeSpan] = useState(5);

	useEffect(() => {
		setLabels([]);
		setWins([]);
		setLosses([]);
		setDraws([]);
		// WINS

		const w = filter(games, ['gameOver.winnerUID', uid]);

		for (let i = 0; i < timeSpan; i++) {
			const month = subMonths(new Date(), i);
			setLabels((labels) => [...labels, format(month, 'MMMM')]);

			let count = 0;

			forEach(w, (win) => {
				const date = win.createdAt;

				if (isSameMonth(month, date.toDate())) {
					count += 1;
				}
			});

			setWins((wins) => [...wins, count]);
		}

		// LOSSES
		const l = filter(games, (game) => {
			const draw = game.gameOver.winnerUID === undefined;
			const loss = game.gameOver.winnerUID !== uid;

			if (!draw && loss) {
				return game;
			}
		}) as ChessGameType[];

		for (let i = 0; i < timeSpan; i++) {
			const month = subMonths(new Date(), i);
			let count = 0;

			forEach(l, (loss) => {
				const date = loss.createdAt;

				if (isSameMonth(month, date.toDate())) {
					count += 1;
				}
			});

			setLosses((losses) => [...losses, count]);
		}

		// DRAWS
		const d = filter(games, (game) => {
			const draw = game.gameOver.winner === undefined;

			if (draw) {
				return game;
			}
		}) as ChessGameType[];

		for (let i = 0; i < timeSpan; i++) {
			const month = subMonths(new Date(), i);
			let count = 0;

			forEach(d, (draw) => {
				const date = draw.createdAt;

				if (isSameMonth(month, date.toDate())) {
					count += 1;
				}
			});

			setDraws((draws) => [...draws, count]);
		}
	}, []);

	console.log('wins:  ', wins);

	return (
		<StatsContainer>
			<StackedBarChart
				title="Wins/Draws/Losses"
				labels={labels}
				data={[
					{ label: 'Wins', data: wins, backgroundColor: blueGrey[900] },
					{ label: 'Draws', data: draws, backgroundColor: blueGrey[100] },
					{ label: 'Losses', data: losses, backgroundColor: blueGrey[600] },
				]}
			/>
		</StatsContainer>
	);
};

export default WinsLossesDrawsChart;
