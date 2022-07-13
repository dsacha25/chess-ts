import React, { FC, useEffect, useState } from 'react';
import { ListItemText } from '../../../common/lists/list-item-text/list-item-text.styles';
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
// import useActions from '../../../../hooks/use-actions/use-actions.hook';
import getOpponentName from '../../../../utils/helpers/strings/get-opponent-name/get-opponent-name';
import parseGameMode from '../../../../utils/helpers/parsers/parse-game-mode/parse-game-mode';
import PreviewChessboard from '../../game-play/boards/preview-chessboard/preview-chessboard.component';
import parsePlayerSide from '../../../../utils/helpers/parsers/parse-player-side/parse-player-side';

const ActiveGamesListItem: FC<ActiveGamesListItemProps> = ({ game }) => {
	// const { setActiveGame } = useActions();
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
		// setActiveGame(game);
		// Redirect to /play
		navigate(`/${Paths.PLAY}?game=${game.id}`);
	};

	return (
		<ActiveListItem columns={3} width="auto">
			<ListItemText>{opponentName}</ListItemText>
			<ListItemText>{parseGameMode(game.gameMode)}</ListItemText>
			<PreviewChessboard
				fen={game.fen}
				orientation={parsePlayerSide(game, uid)}
			/>
			<JoinGameButton onClick={handleJoinGame} color="secondary">
				<FaChessKing size="30px" />
			</JoinGameButton>
		</ActiveListItem>
	);
};

export default ActiveGamesListItem;
