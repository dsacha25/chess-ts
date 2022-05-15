import React, { FC, useEffect, useState } from 'react';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectUserUID } from '../../../../redux/user/user.selector';
import getOpponentName from '../../../../utils/helpers/strings/get-opponent-name/get-opponent-name';
import { ListItemText } from '../../../common/lists/list-item-text/list-item-text.styles';
import { ListItem } from '../../../common/lists/list-item/list-item.styles';
import { InactiveGameAnalysisButton } from './inactive-game-list-item.styles';
import { InactiveGamesListItemProps } from './types';
import { FaChessBoard } from 'react-icons/fa';

const InactiveGameListItem: FC<InactiveGamesListItemProps> = ({ game }) => {
	const uid = useSelector((state) => selectUserUID(state));
	const [oppName, setOppName] = useState('');

	useEffect(() => {
		if (uid) {
			setOppName(getOpponentName(uid, game));
		}
	}, []);

	return (
		<ListItem columns={1}>
			<ListItemText>{oppName}</ListItemText>
			<InactiveGameAnalysisButton color="main">
				<FaChessBoard size="30px" />
			</InactiveGameAnalysisButton>
		</ListItem>
	);
};

export default InactiveGameListItem;
