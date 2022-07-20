import { filter, forEach } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import parseGameMode from '../../../utils/helpers/parsers/parse-game-mode/parse-game-mode';
import HorizontalBarChart from '../../charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { GameTypesChartContainer } from './game-types-played.styles';
import GameTypesPlayedProps from './types';

const GameTypesPlayed: FC<GameTypesPlayedProps> = ({ games }) => {
	const [typesPlayed, setTypesPlayed] = useState<number[]>([]);
	const labels = [
		'Untimed',
		'5 minute',
		'5 | 5',
		'10 minute',
		'10 | 15',
		'1 Day',
		'3 Day',
	];

	useEffect(() => {
		if (typesPlayed.length > 0) {
			setTypesPlayed([]);
		}

		forEach(labels, (label, i) => {
			const gameType = filter(
				games,
				(game) => parseGameMode(game.gameMode) === label
			);

			setTypesPlayed((typesPlayed) => [...typesPlayed, gameType.length]);
		});

		// eslint-disable-next-line
	}, []);

	return (
		<GameTypesChartContainer>
			<HorizontalBarChart
				labels={labels}
				title="Game Types Played"
				data={typesPlayed}
			/>
		</GameTypesChartContainer>
	);
};

export default GameTypesPlayed;
