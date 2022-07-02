import React, { FC, createRef, useEffect, memo, useMemo } from 'react';
import { GameTimeLeft } from './countdown-timer.styles';
import Countdown, {
	CountdownRendererFn,
	calcTimeDelta,
	zeroPad,
} from 'react-countdown';
import { CountdownTimerProps } from './types';
import { isEqual } from 'lodash';

const renderer: CountdownRendererFn = (props) => {
	if (props.completed) {
		return <GameTimeLeft>00:00</GameTimeLeft>;
	} else {
		return (
			<GameTimeLeft>
				{props.hours && `${props.hours}:`}
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
		if (isPaused) return;
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

const propsAreEqual = (
	prevProps: CountdownTimerProps,
	nextProps: CountdownTimerProps
) => {
	return (
		prevProps.isPaused === nextProps.isPaused &&
		prevProps.hidden === nextProps.hidden
	);
};

export default memo(CountdownTimer, propsAreEqual);
