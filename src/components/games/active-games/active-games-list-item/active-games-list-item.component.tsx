import React, { FC, useEffect, useState } from 'react';
import { ListItemText } from '../../../common/lists/list-item-text/list-item-text.styles';
import { ListItem } from '../../../common/lists/list-item/list-item.styles';
import {
	ActiveListItem,
	JoinGameButton,
} from './active-games-list-item.styles';
import { ActiveGamesListItemProps } from './types';
import { FaChessKing } from 'react-icons/fa';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectUserUID } from '../../../../redux/user/user.selector';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../utils/types/paths/paths';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import getOpponentName from '../../../../utils/helpers/strings/get-opponent-name/get-opponent-name';
import parseGameMode from '../../../../utils/helpers/parsers/parse-game-mode/parse-game-mode';

const ActiveGamesListItem: FC<ActiveGamesListItemProps> = ({ game }) => {
	const { setActiveGame } = useActions();
	const navigate = useNavigate();
	const uid = useSelector((state) => selectUserUID(state));

	const [opponentName, setOpponentName] = useState('');

	useEffect(() => {
		if (uid) {
			setOpponentName(getOpponentName(uid, game));
		}

		// eslint-disable-next-line
	}, []);

	const handleJoinGame = () => {
		// Set active game
		setActiveGame(game);
		// Redirect to /play
		navigate(`/${Paths.PLAY}`);
	};

	//// TODO:
	// * Display screenshot of current board position

	return (
		<ActiveListItem columns={2} width="auto">
			<ListItemText>{opponentName}</ListItemText>
			<ListItemText>{parseGameMode(game.gameMode)}</ListItemText>
			<JoinGameButton onClick={handleJoinGame} color="secondary">
				<FaChessKing size="30px" />
			</JoinGameButton>
		</ActiveListItem>
	);
};

export default ActiveGamesListItem;
