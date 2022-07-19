import React, { useEffect, useState } from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectInactiveGames } from '../../../redux/game/game.selector';
import { selectUserUID } from '../../../redux/user/user.selector';
import DoughnutChart from '../../charts/doughnut-chart/doughnut-chart.component';
import HorizontalBarChart from '../../charts/horizontal-bar-chart/horizontal-bar-chart.component';
import LineChart from '../../charts/line-chart/line-chart.component';
import StackedBarChart from '../../charts/stacked-bar-chart/stacked-bar-chart.component';
import { TabTitle } from '../tab-styles/tab-styles..styles';
import { StatsContainer } from './stats-tab.styles';

const StatsTab = () => {
	const uid = useSelector((state) => selectUserUID(state));
	const inactiveGames = useSelector((state) => selectInactiveGames(state));
	const [total, setTotal] = useState(0);
	const [wins, setWins] = useState(0);
	const [losses, setLosses] = useState(0);

	useEffect(() => {
		setTotal(inactiveGames.length);
		let totalWins = 0;
		let totalLosses = 0;
		for (const game of inactiveGames) {
			const isWhite = game.white.uid === uid;

			// IS WHITE
			if (isWhite && game.gameOver.winner === 'white') {
				totalWins = totalWins + 1;
				setWins(totalWins);
			} else if (isWhite && game.gameOver.winner === 'black') {
				totalLosses = totalLosses + 1;
				setLosses(totalLosses);
			}

			// IS BLACK
			if (!isWhite && game.gameOver.winner === 'black') {
				totalWins = totalWins + 1;
				setWins(totalWins);
			} else if (!isWhite && game.gameOver.winner === 'white') {
				totalLosses = totalLosses + 1;
				setLosses(totalLosses);
			}
		}

		return () => {
			setTotal(0);
			setWins(0);
			setLosses(0);
		};

		// eslint-disable-next-line
	}, []);

	return (
		<StatsContainer>
			<TabTitle>Stats Page</TabTitle>
			<div>
				<p>You're not very good, are you?.</p>

				<p>
					<strong>TOTAL GAMES:</strong> {total}
				</p>
				<p>
					<strong>WINS:</strong> {wins} <br /> <strong>LOSSES:</strong> {losses}
				</p>

				<HorizontalBarChart />
				<LineChart />
				<StackedBarChart />
				<DoughnutChart />
			</div>
		</StatsContainer>
	);
};

export default StatsTab;
