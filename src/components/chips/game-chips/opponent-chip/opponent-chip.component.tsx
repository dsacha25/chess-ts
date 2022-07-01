import { add, milliseconds } from 'date-fns';
import React, { memo, useEffect, useState } from 'react';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemyInfo } from '../../../../redux/enemies/enemies.selector';
import { selectActiveGame } from '../../../../redux/game/game.selector';
import parseGameTime from '../../../../utils/helpers/parsers/parse-game-time/parse-game-time';
import { OnlineStatusIndicator } from '../../../common/online-status-indicator/online-status-indicator.styles';
import {
	ChipRating,
	OpponentChipAvatar,
	OpponentChipContainer,
	OpponentChipInfo,
	OpponentUserName,
} from './opponent-chip.styles';
import CountdownTimer from '../../../common/countdown-timer/countdown-timer.component';

import { CountdownTimeDelta } from 'react-countdown';

const OpponentChip = () => {
	const { setActiveGameTime } = useActions();
	const enemy = useSelector((state) => selectEnemyInfo(state));
	const game = useSelector((state) => selectActiveGame(state));

	const [side, setSide] = useState('white');

	useEffect(() => {
		if (game && enemy) {
			setSide(game.black.uid === enemy.uid ? 'black' : 'white');
		}

		// eslint-disable-next-line
	}, []);

	const handleTime = (time: CountdownTimeDelta) => {
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
		<OpponentChipContainer>
			<OpponentChipAvatar url={enemy.photoURL}>
				<OnlineStatusIndicator online={enemy.online} left />
			</OpponentChipAvatar>
			<OpponentChipInfo>
				<OpponentUserName>{enemy.displayName}</OpponentUserName>
				<ChipRating>{enemy.rating}</ChipRating>

				<CountdownTimer
					date={Date.now() + milliseconds(parseGameTime(enemy.uid, game) || {})}
					getTime={handleTime}
					isPaused={side !== game.turn}
					hidden={game.gameMode === 'untimed'}
				/>
			</OpponentChipInfo>
		</OpponentChipContainer>
	);
};

export default memo(OpponentChip);
