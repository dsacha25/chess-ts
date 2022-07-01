import React, { FC, createRef, useEffect } from 'react';
import { GameTimeLeft } from './countdown-timer.styles';
import Countdown, {
	CountdownRendererFn,
	calcTimeDelta,
	zeroPad,
} from 'react-countdown';
import { CountdownTimerProps } from './types';

const renderer: CountdownRendererFn = (props) => {
	if (props.completed) {
		return <GameTimeLeft>00:00</GameTimeLeft>;
	} else {
		return (
			<GameTimeLeft>
				{props.minutes}:{zeroPad(props.seconds)}
			</GameTimeLeft>
		);
	}
};

const CountdownTimer: FC<CountdownTimerProps> = ({
	date,
	getTime,
	isPaused,
	hidden,
}) => {
	const ref = createRef<Countdown>();
	const handleTick = () => {
		const time = calcTimeDelta(date);

		getTime(time);
	};

	useEffect(() => {
		if (!ref.current) return;

		if (isPaused) {
			ref.current.api?.pause();
		} else {
			ref.current.api?.start();
		}
	});

	if (hidden) return null;

	return (
		<Countdown date={date} renderer={renderer} onTick={handleTick} ref={ref} />
	);
};

export default CountdownTimer;
