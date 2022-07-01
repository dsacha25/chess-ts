import { CountdownTimeDelta } from 'react-countdown';

export interface CountdownTimerProps {
	date: string | number | Date;
	getTime: (props: CountdownTimeDelta) => void;
}
