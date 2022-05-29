import React, { useEffect, useState } from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectInactiveGames } from '../../../redux/game/game.selector';
import { selectUserUID } from '../../../redux/user/user.selector';
import Title from '../../common/title/title.styles';
import { TabTitle } from '../challenge-tab/challenge-tab.styles';
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
			if (isWhite && game.winner === 'white') {
				totalWins = totalWins + 1;
				setWins(totalWins);
			} else if (isWhite && game.winner === 'black') {
				totalLosses = totalLosses + 1;
				setLosses(totalLosses);
			}

			// IS BLACK
			if (!isWhite && game.winner === 'black') {
				totalWins = totalWins + 1;
				setWins(totalWins);
			} else if (!isWhite && game.winner === 'white') {
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
			<p>A comprehensive analysis of how shitty you are.</p>
			<p>Spoiler alert, its a lot.</p>
			<p>
				<strong>WINS:</strong> {wins} <br /> <strong>LOSSES:</strong> {losses}
			</p>
			<p>Also eat a dick.</p>
		</StatsContainer>
	);
};

export default StatsTab;
