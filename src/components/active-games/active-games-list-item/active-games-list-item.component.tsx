import React, { FC, useEffect, useState } from 'react';
import { ListItemText } from '../../common/lists/list-item-text/list-item-text.styles';
import { ListItem } from '../../common/lists/list-item/list-item.styles';
import { JoinGameButton } from './active-games-list-item.styles';
import { ActiveGamesListItemProps } from './types';
import { FaChessKing } from 'react-icons/fa';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectUserUID } from '../../../redux/user/user.selector';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../utils/types/paths/paths';
import useActions from '../../../hooks/use-actions/use-actions.hook';

const ActiveGamesListItem: FC<ActiveGamesListItemProps> = ({ game }) => {
	const { setActiveGame } = useActions();
	const navigate = useNavigate();
	const uid = useSelector((state) => selectUserUID(state));

	const [opponentName, setOpponentName] = useState('');

	useEffect(() => {
		if (game.black.uid !== uid) {
			setOpponentName(game.black.displayName);
		}

		if (game.white.uid !== uid) {
			setOpponentName(game.white.displayName);
		}

		// eslint-disable-next-line
	}, []);

	const handleJoinGame = () => {
		// Set active game
		setActiveGame(game);
		// Redirect to /play
		navigate(`/${Paths.PLAY}`);
	};

	return (
		<ListItem columns={1}>
			<ListItemText>{opponentName}</ListItemText>
			<JoinGameButton onClick={handleJoinGame} color="main">
				<FaChessKing size="30px" />
			</JoinGameButton>
		</ListItem>
	);
};

export default ActiveGamesListItem;
