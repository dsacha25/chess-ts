import React, { useEffect, useState } from 'react';
import { add, intervalToDuration } from 'date-fns';
import {
	GameInfoDisplayContainer,
	GameTime,
	TimerContainer,
} from './game-info-display.styles';
import durationToTime from '../../../../utils/helpers/strings/duration-to-time/duration-to-time';

const GameInfoDisplay = () => {
	const [time, setTime] = useState('10:00');
	const [startTime, setStartTime] = useState(new Date());
	const endTime = add(startTime, { minutes: 10 });

	useEffect(() => {
		console.log(
			'TIME: ',
			intervalToDuration({ start: startTime, end: endTime })
		);

		// setTime(
		// 	durationToTime(intervalToDuration({ start: startTime, end: endTime }))
		// );

		let timeOut = setTimeout(() => {
			let newStart = new Date().getMilliseconds() + 1000;
			setTime(
				durationToTime(
					intervalToDuration({
						start: new Date().setMilliseconds(newStart),
						end: endTime,
					})
				)
			);
		}, 1000);

		return () => {
			clearTimeout(timeOut);
		};

		// eslint-disable-next-line
	}, [time]);

	return (
		<GameInfoDisplayContainer>
			<TimerContainer>
				<GameTime>{time}</GameTime>
			</TimerContainer>
		</GameInfoDisplayContainer>
	);
};

export default GameInfoDisplay;
