import { add, intervalToDuration, milliseconds } from 'date-fns';
import React, { memo, useEffect, useState } from 'react';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectActiveGame } from '../../../../redux/game/game.selector';
import {
	selectChessUser,
	selectIsUserOnline,
} from '../../../../redux/user/user.selector';
import parseGameTime from '../../../../utils/helpers/parsers/parse-game-time/parse-game-time';
import durationToTime from '../../../../utils/helpers/strings/duration-to-time/duration-to-time';
import CountdownTimer from '../../../common/countdown-timer/countdown-timer.component';
import { OnlineStatusIndicator } from '../../../common/online-status-indicator/online-status-indicator.styles';
import {
	PlayerChipAvatar,
	PlayerChipContainer,
	PlayerChipInfo,
	ChipUserName,
	ChipRating,
	GameTimeLeft,
} from './player-chip.styles';
import { CountdownTimeDelta } from 'react-countdown';

const PlayerChip = () => {
	const { setActiveGameTime } = useActions();
	const chessUser = useSelector((state) => selectChessUser(state));
	const game = useSelector((state) => selectActiveGame(state));
	const online = useSelector((state) => selectIsUserOnline(state));

	const [time, setTime] = useState('00');
	const [end, setEnd] = useState(
		add(new Date(), { days: 0, minutes: 0, seconds: 0 })
	);
	const [side, setSide] = useState('white');

	useEffect(() => {
		if (game && chessUser) {
			setEnd(add(new Date(), parseGameTime(chessUser.uid, game) || {}));
			setSide(game.black.uid === chessUser.uid ? 'black' : 'white');
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (game && chessUser) {
			setEnd(add(new Date(), parseGameTime(chessUser.uid, game) || {}));
			setTime(
				durationToTime(
					intervalToDuration({
						start: new Date(),
						end: add(new Date(), parseGameTime(chessUser.uid, game) || {}),
					})
				)
			);
		}
	}, [game]);

	useEffect(() => {
		console.log('TURN: ', game?.turn);
		console.log('UID: ', chessUser?.uid);
		console.log('BLACK: ', game?.black.uid);
		console.log('PLAYER SIDE: ', side);

		let timeOut = setTimeout(() => {
			if (!chessUser || !game || side !== game.turn || time === '00:00') return;

			let newStart = new Date().getMilliseconds() + 1000;

			const newTime = intervalToDuration({
				start: new Date().setMilliseconds(newStart),
				end,
			});
			setTime(durationToTime(newTime));

			return chessUser.uid === game.black.uid
				? setActiveGameTime(newTime, 'black')
				: setActiveGameTime(newTime, 'white');
		}, 1000);

		return () => {
			clearTimeout(timeOut);
		};

		// eslint-disable-next-line
	}, [time, side]);

	const handleTime = (time: CountdownTimeDelta) => {
		if (chessUser && game) {
			return chessUser.uid === game.black.uid
				? setActiveGameTime(time, 'black')
				: setActiveGameTime(time, 'white');
		}
	};

	if (!chessUser || !game) return null;

	return (
		<PlayerChipContainer>
			<PlayerChipAvatar url={chessUser?.photoURL}>
				<OnlineStatusIndicator online={online} />
			</PlayerChipAvatar>
			<PlayerChipInfo>
				<CountdownTimer
					date={
						Date.now() + milliseconds(parseGameTime(chessUser.uid, game) || {})
					}
					getTime={handleTime}
				/>
				<ChipRating>{chessUser?.rating}</ChipRating>
				<ChipUserName>{chessUser?.displayName}</ChipUserName>
			</PlayerChipInfo>
		</PlayerChipContainer>
	);
};

export default memo(PlayerChip);
