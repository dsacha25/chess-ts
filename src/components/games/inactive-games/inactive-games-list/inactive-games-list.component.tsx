import React, { useEffect, useState } from 'react';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectInactiveGames } from '../../../../redux/game/game.selector';
import { selectUserUID } from '../../../../redux/user/user.selector';
import { List } from '../../../common/lists/list/list.styles';
import Title from '../../../common/title/title.styles';
import InactiveGameListItem from '../inactive-game-list-item/inactive-game-list-item,component';

const InactiveGamesList = () => {
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
	}, []);

	return (
		<List>
			<Title fontSize="30px">Inactive Games</Title>
			<p>
				#: {total} W: {wins} L: {losses}
			</p>
			{inactiveGames.map((inactiveGame, i) => (
				<InactiveGameListItem key={i} game={inactiveGame} />
			))}
		</List>
	);
};

export default InactiveGamesList;
