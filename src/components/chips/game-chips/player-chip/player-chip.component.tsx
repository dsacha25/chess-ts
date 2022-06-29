import { add, intervalToDuration } from 'date-fns';
import React, { useEffect, useState } from 'react';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectActiveGame } from '../../../../redux/game/game.selector';
import { selectChessUser } from '../../../../redux/user/user.selector';
import parseGameTime from '../../../../utils/helpers/parsers/parse-game-time/parse-game-time';
import durationToTime from '../../../../utils/helpers/strings/duration-to-time/duration-to-time';
import {
	PlayerChipAvatar,
	PlayerChipContainer,
	PlayerChipInfo,
	ChipUserName,
	ChipRating,
	GameTimeLeft,
} from './player-chip.styles';

const PlayerChip = () => {
	const { setActiveGameTime } = useActions();
	const chessUser = useSelector((state) => selectChessUser(state));
	const game = useSelector((state) => selectActiveGame(state));
	const [time, setTime] = useState('00:00');
	const [end, setEnd] = useState(
		add(new Date(), { days: 0, minutes: 0, seconds: 0 })
	);
	const [side, setSide] = useState('white');

	useEffect(() => {
		if (game && chessUser) {
			setEnd(add(new Date(), parseGameTime(chessUser.uid, game) || {}));
			setSide(game.black.uid === chessUser.uid ? 'black' : 'white');

			setTime(
				durationToTime(
					intervalToDuration({
						start: new Date(),
						end: add(new Date(), parseGameTime(chessUser.uid, game) || {}),
					})
				)
			);
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// console.log('TIME: ', intervalToDuration({ start: new Date(), end }));

		let timeOut = setTimeout(() => {
			if (!chessUser || !game || side !== game.turn) return;

			let newStart = new Date().getMilliseconds() + 1000;

			const time = intervalToDuration({
				start: new Date().setMilliseconds(newStart),
				end,
			});
			setTime(durationToTime(time));

			return chessUser.uid === game.black.uid
				? setActiveGameTime(time, 'black')
				: setActiveGameTime(time, 'white');
		}, 1000);

		return () => {
			clearTimeout(timeOut);
		};

		// eslint-disable-next-line
	}, [time]);

	return (
		<PlayerChipContainer>
			<PlayerChipAvatar url={chessUser?.photoURL} />
			<PlayerChipInfo>
				<GameTimeLeft>{time}</GameTimeLeft>
				<ChipRating>{chessUser?.rating}</ChipRating>

				<ChipUserName>{chessUser?.displayName}</ChipUserName>
			</PlayerChipInfo>
		</PlayerChipContainer>
	);
};

export default PlayerChip;
