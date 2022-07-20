import React, { useEffect, useState } from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectInactiveGames } from '../../../redux/game/game.selector';
import { selectUserUID } from '../../../redux/user/user.selector';
import DoughnutChart from '../../charts/doughnut-chart/doughnut-chart.component';
import LineChart from '../../charts/line-chart/line-chart.component';
import GameResultsBy from '../../statistics/game-results-by/game-results-by.component';
import GameTypesPlayed from '../../statistics/game-types-played/game-types-played.component';
import WinsLossesDrawsChart from '../../statistics/wins-losses-draws-chart/wins-losses-draws-chart.component';
import { TabTitle } from '../tab-styles/tab-styles..styles';
import { StatsContainer, StatsData } from './stats-tab.styles';

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
		console.log('INACTIVE GAMES: ', inactiveGames);

		for (const game of inactiveGames) {
			console.log('INACTIVE GAME MODES: ', game.gameMode);
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
			<StatsData>
				<p>You're not very good, are you?</p>

				<p>
					<strong>TOTAL GAMES:</strong> {total}
					<br />
					<strong>WINS:</strong> {wins} <br /> <strong>LOSSES:</strong> {losses}
				</p>

				<GameTypesPlayed games={inactiveGames} />
				<WinsLossesDrawsChart games={inactiveGames} />
				<GameResultsBy games={inactiveGames} />
				<LineChart />
			</StatsData>
		</StatsContainer>
	);
};

export default StatsTab;
