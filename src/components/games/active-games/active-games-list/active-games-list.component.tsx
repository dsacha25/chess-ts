import React from 'react';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectActiveGames } from '../../../../redux/game/game.selector';
import { List } from '../../../common/lists/list/list.styles';
import Title from '../../../common/title/title.styles';
import ActiveGamesListItem from '../active-games-list-item/active-games-list-item.component';

const ActiveGamesList = () => {
	const games = useSelector((state) => selectActiveGames(state));

	return (
		<List>
			<Title fontSize="30px">Active Games</Title>
			{games.map((game, i) => (
				<ActiveGamesListItem key={i} game={game} />
			))}
		</List>
	);
};

export default ActiveGamesList;
