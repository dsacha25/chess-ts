import { add, intervalToDuration } from 'date-fns';
import React, { useEffect, useState } from 'react';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemyInfo } from '../../../../redux/enemies/enemies.selector';
import { selectActiveGame } from '../../../../redux/game/game.selector';
import parseGameTime from '../../../../utils/helpers/parsers/parse-game-time/parse-game-time';
import durationToTime from '../../../../utils/helpers/strings/duration-to-time/duration-to-time';
import {
	ChipRating,
	GameTimeLeft,
	OpponentChipAvatar,
	OpponentChipContainer,
	OpponentChipInfo,
	OpponentUserName,
} from './opponent-chip.styles';

const OpponentChip = () => {
	const { setActiveGameTime } = useActions();
	const enemy = useSelector((state) => selectEnemyInfo(state));
	const game = useSelector((state) => selectActiveGame(state));
	const [time, setTime] = useState('00:00');
	const [end, setEnd] = useState(
		add(new Date(), { days: 0, minutes: 0, seconds: 0 })
	);
	const [side, setSide] = useState('white');

	useEffect(() => {
		if (game && enemy) {
			setEnd(add(new Date(), parseGameTime(enemy.uid, game) || {}));
			setSide(game.black.uid === enemy.uid ? 'black' : 'white');

			setTime(
				durationToTime(
					intervalToDuration({
						start: new Date(),
						end: add(new Date(), parseGameTime(enemy.uid, game) || {}),
					})
				)
			);
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// console.log('TIME: ', intervalToDuration({ start: new Date(), end }));

		let timeOut = setTimeout(() => {
			if (!enemy || !game || side !== game.turn) return;

			let newStart = new Date().getMilliseconds() + 1000;

			const time = intervalToDuration({
				start: new Date().setMilliseconds(newStart),
				end,
			});
			setTime(durationToTime(time));

			return enemy.uid === game.black.uid
				? setActiveGameTime(time, 'black')
				: setActiveGameTime(time, 'white');
		}, 1000);

		return () => {
			clearTimeout(timeOut);
		};

		// eslint-disable-next-line
	}, [time]);

	if (!enemy) return null;
	return (
		<OpponentChipContainer>
			<OpponentChipAvatar url={enemy.photoURL} />
			<OpponentChipInfo>
				<OpponentUserName>{enemy.displayName}</OpponentUserName>
				<ChipRating>{enemy.rating}</ChipRating>
				<GameTimeLeft>{time}</GameTimeLeft>
			</OpponentChipInfo>
		</OpponentChipContainer>
	);
};

export default OpponentChip;
