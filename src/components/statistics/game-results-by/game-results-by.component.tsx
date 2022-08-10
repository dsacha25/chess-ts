import React, { FC, useEffect, useState } from 'react';
import { filter } from 'lodash';
import DoughnutChart from '../../charts/doughnut-chart/doughnut-chart.component';
import GameResultsByProps from './types';
import { selectUserUID } from '../../../redux/user/user.selector';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { StatsContainer } from '../statistics-styles/statistics-styles.styles';

const GameResultsBy: FC<GameResultsByProps> = ({ games }) => {
	const uid = useSelector((state) => selectUserUID(state));
	const [wins, setWins] = useState<number[]>([]);
	const [losses, setLosses] = useState<number[]>([]);
	const [draws, setDraws] = useState<number[]>([]);

	useEffect(() => {
		const gamesWon = filter(games, ['gameOver.winnerUID', uid]);

		const checkMates = filter(gamesWon, ['gameOver.type', 'CHECKMATE']);
		const resignations = filter(gamesWon, ['gameOver.type', 'RESIGNATION']);
		const abandonments = filter(gamesWon, ['gameOver.type', 'ABANDONMENT']);
		const timeouts = filter(gamesWon, ['gameOver.type', 'TIMEOUT']);

		console.log('GAMES WON: ', gamesWon);
		console.log('CHECKMATES: ', checkMates);
		console.log('RESIGNATION: ', resignations);
		console.log('ABANDONMENT: ', abandonments);
		console.log('TIMEOUT: ', timeouts);

		setWins([
			checkMates.length,
			resignations.length,
			abandonments.length,
			timeouts.length,
		]);
	}, []);

	useEffect(() => {
		const gamesLost = filter(games, (game) => {
			return game.gameOver.winnerUID !== uid;
		});

		const checkMates = filter(gamesLost, ['gameOver.type', 'CHECKMATE']);
		const resignations = filter(gamesLost, ['gameOver.type', 'RESIGNATION']);
		const abandonments = filter(gamesLost, ['gameOver.type', 'ABANDONMENT']);
		const timeouts = filter(gamesLost, ['gameOver.type', 'TIMEOUT']);
		const stalemates = filter(gamesLost, ['gameOver.type', 'DRAW_STALEMATE']);

		console.log('GAMES LOST: ', gamesLost);
		console.log('CHECKMATES: ', checkMates);
		console.log('RESIGNATION: ', resignations);
		console.log('ABANDONMENT: ', abandonments);
		console.log('TIMEOUT: ', timeouts);
		console.log('STALEMATES: ', stalemates);

		setLosses([
			checkMates.length,
			resignations.length,
			abandonments.length,
			timeouts.length,
		]);

		setDraws([stalemates.length, 0, 0, 0, 0]);
	}, []);

	return (
		<StatsContainer>
			<DoughnutChart
				title="Wins"
				data={wins}
				labels={['Checkmate', 'Resignation', 'Abandonment', 'Timeout']}
				colorName="blueGrey"
			/>
			<DoughnutChart
				title="Draws"
				data={draws}
				labels={[
					'Stalement',
					'Agreement',
					'50 Move Rule',
					'Repetion',
					'Insufficient Material',
				]}
				colorName="grey"
			/>
			<DoughnutChart
				title="Losses"
				data={losses}
				labels={['Checkmate', 'Resignation', 'Abandonment', 'Timeout']}
				colorName="pink"
			/>
		</StatsContainer>
	);
};

export default GameResultsBy;
