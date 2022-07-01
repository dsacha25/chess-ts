import React, { FC } from 'react';
import { GameTimeLeft } from './countdown-timer.styles';
import Countdown, {
	CountdownRendererFn,
	calcTimeDelta,
	zeroPad,
} from 'react-countdown';
import { CountdownTimerProps } from './types';

const renderer: CountdownRendererFn = ({ minutes, seconds, completed }) => {
	if (completed) {
		return <GameTimeLeft>00</GameTimeLeft>;
	} else {
		return (
			<GameTimeLeft>
				{minutes}:{zeroPad(seconds)}
			</GameTimeLeft>
		);
	}
};

const CountdownTimer: FC<CountdownTimerProps> = ({ date, getTime }) => {
	const handleTick = () => {
		const time = calcTimeDelta(date);

		getTime(time);

		console.log('TIME: ', time);
	};

	return <Countdown date={date} renderer={renderer} onTick={handleTick} />;
};

export default CountdownTimer;
