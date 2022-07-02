import React, { memo, useEffect, useState } from 'react';
import { milliseconds } from 'date-fns';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemyInfo } from '../../../../redux/enemies/enemies.selector';
import { selectActiveGame } from '../../../../redux/game/game.selector';
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

const Name = memo(PlayerName);
const Rating = memo(PlayerRating);
const OnlineStatus = memo(OnlineStatusIndicator);

const OpponentChip = () => {
	const { setActiveGameTime } = useActions();
	const enemy = useSelector((state) => selectEnemyInfo(state));
	const game = useSelector((state) => selectActiveGame(state));

	const [side, setSide] = useState('white');
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		if (!game) return;
		if (side !== game.turn) {
			setPaused(true);
		} else {
			setPaused(false);
		}
	}, [side, game]);

	useEffect(() => {
		if (!game) return;

		if (!game.blackPresent || !game.whitePresent) {
			setPaused(true);
		} else {
			setPaused(false);
		}
	}, [game]);

	useEffect(() => {
		if (game && enemy) {
			setSide(game.black.uid === enemy.uid ? 'black' : 'white');
		}

		// eslint-disable-next-line
	}, []);

	const handleTime = (time: CountdownTimeDelta) => {
		if (enemy && game) {
			// console.log('TURN ', game.turn);
			// console.log('OPP SIDE', side);
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
					date={Date.now() + milliseconds(parseGameTime(enemy.uid, game) || {})}
					getTime={handleTime}
					isPaused={paused}
					hidden={game.gameMode === 'untimed'}
				/>
			</PlayerInfo>
		</ChipContainer>
	);
};

export default memo(OpponentChip);
