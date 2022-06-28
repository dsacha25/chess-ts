import React, { useEffect, useState } from 'react';
import { add, differenceInMilliseconds, intervalToDuration } from 'date-fns';
import {
	GameInfoDisplayContainer,
	GameTime,
	TimerContainer,
} from './game-info-display.styles';
import durationToTime from '../../../../utils/helpers/strings/duration-to-time/duration-to-time';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';

const GameInfoDisplay = () => {
	const [time, setTime] = useState('00:00');
	const [end, setEnd] = useState(add(new Date(), { minutes: 2 }));
	const [difference, setDifference] = useState(0);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		// console.log('TIME: ', intervalToDuration({ start: new Date(), end }));

		let timeOut = setTimeout(() => {
			if (paused) return;
			let newStart = new Date().getMilliseconds() + 1000;
			setTime(
				durationToTime(
					intervalToDuration({
						start: new Date().setMilliseconds(newStart),
						end,
					})
				)
			);
		}, 1000);

		return () => {
			clearTimeout(timeOut);
		};

		// eslint-disable-next-line
	}, [time, paused]);

	const handlePause = () => {
		setPaused(!paused);
		console.log('PARSE:', differenceInMilliseconds(end, new Date()));

		if (!paused) {
			setDifference(differenceInMilliseconds(end, new Date()));
		} else {
			let newEnd = new Date().getMilliseconds() + difference;
			let endDate = new Date();
			endDate.setMilliseconds(newEnd);

			setEnd(endDate);
		}

		// return paused && setEnd();
	};

	return (
		<GameInfoDisplayContainer>
			<TimerContainer>
				<GameTime>{time}</GameTime>

				{/* <CustomButton onClick={handlePause}>
					{paused ? 'Start' : 'Pause'}
				</CustomButton> */}
			</TimerContainer>
		</GameInfoDisplayContainer>
	);
};

export default GameInfoDisplay;
