import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { milliseconds, toDate } from 'date-fns';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectActiveGame,
	selectGameTurn,
} from '../../../../redux/game/game.selector';
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
import parseCurrentPlayer from '../../../../utils/helpers/parsers/parse-current-player/parse-current-player';
import parseTimeUnit from '../../../../utils/helpers/parsers/parse-time-unit/parse-time-unit';
import isPresenceRequired from '../../../../utils/helpers/is-presence-required/is-presence-required';
import parsePlayerSide from '../../../../utils/helpers/parsers/parse-player-side/parse-player-side';
import { Timestamp } from 'firebase/firestore';

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
	const turn = useSelector((state) => selectGameTurn(state));

	const [side, setSide] = useState('white');
	const [paused, setPaused] = useState(false);
	const [time, setTime] = useState(Date.now());

	useEffect(() => {
		if (game) {
			console.log('BLACK UID: ', game.black.uid);
			console.log('UID: ', uid);
			console.log('BLACK UID === PLAYER UID: ', game.black.uid === uid);
			setSide(game.black.uid === uid ? 'black' : 'white');
			console.log('PLAYER SIDE: ', side);
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (game) {
			const { previousMoveTime } = parseCurrentPlayer(uid, game, true);

			console.log('PRESENCE?: ', isPresenceRequired(game.gameMode));
			if (!isPresenceRequired(game.gameMode)) return;

			console.log('PREVIOUS MOVE TIME: ', previousMoveTime);

			if (previousMoveTime instanceof Timestamp) {
				console.log('SET TIME FROM PREVIOUS MOVE');
				setTime(previousMoveTime.toDate().getTime() + parseTimeUnit(game));

				console.log('PREVIOUS MOVE:', previousMoveTime.toDate().getTime());
			} else if (game.createdAt && !previousMoveTime) {
				console.log('SET TIME FROM CREATED AT');
				setTime(Date.now() + parseTimeUnit(game));
			}
		}
	}, [game, turn, side]);

	useEffect(() => {
		if (game && side === turn && !isPresenceRequired(game.gameMode)) {
			console.log(
				'SET TIME FROM USER: ',
				Date.now() + milliseconds(parseGameTime(uid, game) || {})
			);

			setTime(Date.now() + milliseconds(parseGameTime(uid, game) || {}));
		}
	}, [game, turn, side]);

	useEffect(() => {
		if (!game) return;
		if (side !== game.turn) {
			console.log('PLAYER PAUSE', side);

			setPaused(true);
		} else {
			console.log('PLAYER START', side);

			setPaused(false);
		}
	}, [game, side]);

	useEffect(() => {
		if (!game) return;

		if (!isPresenceRequired(game.gameMode)) return;

		if (!game.blackPresent || !game.whitePresent) {
			setPaused(true);
		} else {
			setPaused(false);
		}
	}, [game]);

	const handleTime = (time: CountdownTimeDelta) => {
		console.log('USER TIME: ', time);
		if (time.completed) {
			// AUTO RESIGN GAME
		}
		if (chessUser && game) {
			console.log('TURN ', game.turn);
			console.log('PLAYER SIDE', side);
			return chessUser.uid === game.black.uid
				? setActiveGameTime(time, 'black')
				: setActiveGameTime(time, 'white');
		}
	};

	if (!chessUser || !game) return null;

	return (
		<ChipContainer>
			<Avatar url={chessUser.photoURL}>
				<OnlineStatus online={online} />
			</Avatar>
			<PlayerInfo>
				<CountdownTimer
					date={time}
					getTime={handleTime}
					isPaused={paused}
					hidden={game.gameMode === 'untimed'}
				/>
				<Rating>{chessUser.rating}</Rating>
				<Name>{chessUser.displayName}</Name>
			</PlayerInfo>
		</ChipContainer>
	);
};

export default memo(PlayerChip);
