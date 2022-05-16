import React, { FC, useEffect, useState } from 'react';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectUserUID } from '../../../../redux/user/user.selector';
import getOpponentName from '../../../../utils/helpers/strings/get-opponent-name/get-opponent-name';
import { ListItemText } from '../../../common/lists/list-item-text/list-item-text.styles';
import { ListItem } from '../../../common/lists/list-item/list-item.styles';
import { InactiveGameAnalysisButton } from './inactive-game-list-item.styles';
import { InactiveGamesListItemProps } from './types';

import { FaChessBoard } from 'react-icons/fa';
import { GiAchievement } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../utils/types/paths/paths';

const InactiveGameListItem: FC<InactiveGamesListItemProps> = ({ game }) => {
	const navigate = useNavigate();

	const uid = useSelector((state) => selectUserUID(state));
	const [oppName, setOppName] = useState('');
	const [won, setWon] = useState(false);

	const handleAnalyizeGame = () => {
		navigate(`/${Paths.ANALYSIS}?game=${game.id}`);
	};

	useEffect(() => {
		if (uid) {
			setOppName(getOpponentName(uid, game));
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const isWhite = game.white.uid === uid;

		if (isWhite && game.winner === 'white') {
			setWon(true);
		} else if (isWhite && game.winner === 'black') {
			setWon(false);
		}

		// IS BLACK
		if (!isWhite && game.winner === 'black') {
			setWon(true);
		} else if (!isWhite && game.winner === 'white') {
			setWon(false);
		}

		// eslint-disable-next-line
	}, []);

	//// TODO:
	// * Display screenshot of final board position

	return (
		<ListItem columns={2}>
			<ListItemText>{oppName}</ListItemText>
			{won ? (
				<GiAchievement size="30px" color="#091e3b" />
			) : (
				<IoClose size="30px" color="#6B001D" />
			)}
			<InactiveGameAnalysisButton color="main" onClick={handleAnalyizeGame}>
				<FaChessBoard size="30px" />
			</InactiveGameAnalysisButton>
		</ListItem>
	);
};

export default InactiveGameListItem;
