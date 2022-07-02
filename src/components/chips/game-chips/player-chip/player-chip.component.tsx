import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { milliseconds } from 'date-fns';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectActiveGame } from '../../../../redux/game/game.selector';
import {
	selectChessUser,
	selectIsUserOnline,
	selectUserUID,
} from '../../../../redux/user/user.selector';
import parseGameTime from '../../../../utils/helpers/parsers/parse-game-time/parse-game-time';
import CountdownTimer from '../../../common/countdown-timer/countdown-timer.component';
import { OnlineStatusIndicator } from '../../../common/online-status-indicator/online-status-indicator.styles';

import { CountdownTimeDelta } from 'react-countdown';
import {
	ChipAvatar,
	ChipContainer,
	PlayerInfo,
	PlayerName,
	PlayerRating,
} from '../game-chip-styles/game-chip-styles.styles';
import { isEqual } from 'lodash';

const Rating = memo(PlayerRating);
const Name = memo(PlayerName);
const OnlineStatus = memo(OnlineStatusIndicator, isEqual);
const Avatar = memo(ChipAvatar, isEqual);

const PlayerChip = () => {
	const { setActiveGameTime } = useActions();
	const chessUser = useSelector((state) => selectChessUser(state));
	const uid = useSelector((state) => selectUserUID(state)) as string;
	const game = useSelector((state) => selectActiveGame(state));
	const online = useSelector((state) => selectIsUserOnline(state));

	const [side, setSide] = useState('white');

	const date = useMemo(
		() => Date.now() + milliseconds(parseGameTime(uid, game) || {}),
		[uid, game]
	);

	useEffect(() => {
		if (game && chessUser) {
			setSide(game.black.uid === chessUser.uid ? 'black' : 'white');
		}

		// eslint-disable-next-line
	}, []);

	const handleTime = (time: CountdownTimeDelta) => {
		if (chessUser && game) {
			console.log('TURN ', game.turn);
			console.log('PLAYER SIDE', side);
			return chessUser.uid === game.black.uid
				? setActiveGameTime(time, 'black')
				: setActiveGameTime(time, 'white');
		}
	};

	if (!chessUser) return null;

	return (
		<ChipContainer>
			<Avatar url={chessUser.photoURL}>
				<OnlineStatus online={online} />
			</Avatar>
			<PlayerInfo>
				{game && (
					<CountdownTimer
						date={date}
						getTime={handleTime}
						isPaused={side !== game.turn}
						hidden={game.gameMode === 'untimed'}
					/>
				)}
				<Rating>{chessUser.rating}</Rating>
				<Name>{chessUser.displayName}</Name>
			</PlayerInfo>
		</ChipContainer>
	);
};

export default memo(PlayerChip);
