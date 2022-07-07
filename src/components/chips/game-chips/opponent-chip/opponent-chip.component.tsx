import React, { memo, useEffect, useMemo, useState } from 'react';
import { milliseconds, toDate } from 'date-fns';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemyInfo } from '../../../../redux/enemies/enemies.selector';
import {
	selectActiveGame,
	selectGameTurn,
} from '../../../../redux/game/game.selector';
import parseGameTime from '../../../../utils/helpers/parsers/parse-game-time/parse-game-time';
import { OnlineStatusIndicator } from '../../../common/online-status-indicator/online-status-indicator.styles';

import CountdownTimer from '../../../common/countdown-timer/countdown-timer.component';

import { CountdownTimeDelta } from 'react-countdown';
import {
	ChipAvatar,
	ChipContainer,
	PlayerInfo,
	PlayerName,
	PlayerRating,
} from '../game-chip-styles/game-chip-styles.styles';
import parseCurrentPlayer from '../../../../utils/helpers/parsers/parse-current-player/parse-current-player';
import parseTimeUnit from '../../../../utils/helpers/parsers/parse-time-unit/parse-time-unit';
import isPresenceRequired from '../../../../utils/helpers/is-presence-required/is-presence-required';

const Name = memo(PlayerName);
const Rating = memo(PlayerRating);
const OnlineStatus = memo(OnlineStatusIndicator);

const OpponentChip = () => {
	const { setActiveGameTime } = useActions();
	const enemy = useSelector((state) => selectEnemyInfo(state));
	const game = useSelector((state) => selectActiveGame(state));
	const turn = useSelector((state) => selectGameTurn(state));

	const [side, setSide] = useState('white');
	const [paused, setPaused] = useState(false);
	const [time, setTime] = useState(Date.now());

	useEffect(() => {
		if (game && enemy) {
			const { previousMoveTime } = parseCurrentPlayer(enemy.uid, game, true);

			if (!isPresenceRequired(game.gameMode)) return;

			if (previousMoveTime) {
				console.log('SET OPPONENT TIME FROM PREVIOUS MOVE');
				setTime(previousMoveTime.toDate().getTime() + parseTimeUnit(game));
				console.log('PREVIOUS MOVE:', previousMoveTime.toDate().getTime());
			} else if (game.createdAt && !previousMoveTime) {
				console.log('SET OPPONENT TIME FROM CREATED AT');

				setTime(
					toDate(game.createdAt.seconds * 1000).getTime() + parseTimeUnit(game)
				);
			}
		}
	}, [enemy]);

	useEffect(() => {
		if (game && enemy && side === turn && !isPresenceRequired(game.gameMode)) {
			console.log(
				'SET TIME FROM OPPONENT: ',
				Date.now() + milliseconds(parseGameTime(enemy.uid, game) || {})
			);

			setTime(Date.now() + milliseconds(parseGameTime(enemy.uid, game) || {}));
		}
	}, [game, enemy, turn, side]);

	useEffect(() => {
		if (!game) return;
		if (side !== game.turn) {
			console.log('OPP PAUSE', side);
			setPaused(true);
		} else {
			console.log('OPP START', side);
			setPaused(false);
		}
	}, [side, game]);

	useEffect(() => {
		if (!game) return;

		if (!isPresenceRequired(game.gameMode)) return;

		if (!game.blackPresent || !game.whitePresent) {
			setPaused(true);
		} else {
			setPaused(false);
		}
	}, [game]);

	useEffect(() => {
		if (game && enemy) {
			console.log('BLACK UID: ', game.black.uid);
			console.log('ENEMY UID: ', enemy.uid);
			setSide(game.black.uid === enemy.uid ? 'black' : 'white');
		}

		// eslint-disable-next-line
	}, []);

	const handleTime = (time: CountdownTimeDelta) => {
		console.log('OPP TIME: ', time);

		if (time.completed) {
			// AUTO RESIGN GAME
		}
		if (enemy && game) {
			console.log('TURN ', game.turn);
			console.log('OPP SIDE', side);
			return enemy.uid === game.black.uid
				? setActiveGameTime(time, 'black')
				: setActiveGameTime(time, 'white');
		}
	};

	if (!enemy || !game) return null;
	return (
		<ChipContainer opponent>
			<ChipAvatar opponent url={enemy.photoURL}>
				<OnlineStatus online={enemy.online} left />
			</ChipAvatar>
			<PlayerInfo opponent>
				<Name>{enemy.displayName}</Name>
				<Rating>{enemy.rating}</Rating>
				<CountdownTimer
					date={time}
					getTime={handleTime}
					isPaused={paused}
					hidden={game.gameMode === 'untimed'}
				/>
			</PlayerInfo>
		</ChipContainer>
	);
};

export default memo(OpponentChip);
