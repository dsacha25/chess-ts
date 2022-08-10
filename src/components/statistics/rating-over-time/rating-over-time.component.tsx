import { format, isAfter, isBefore, subMonths, subWeeks } from 'date-fns';
import { subDays } from 'date-fns/esm';
import { Timestamp } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectUserUID } from '../../../redux/user/user.selector';
import LineChart from '../../charts/line-chart/line-chart.component';
import { StatsContainer } from '../statistics-styles/statistics-styles.styles';
import RatingOverTimeProps from './types';

const RatingOverTime: FC<RatingOverTimeProps> = ({ games }) => {
	const uid = useSelector((state) => selectUserUID(state));

	const [data, setData] = useState<number[]>([]);
	const [dates, setDates] = useState<string[]>([]);

	useEffect(() => {
		const timeSpan = subWeeks(new Date(), 4);

		setData([]);
		setDates([]);

		let i = 0;
		for (const game of games) {
			if (i > 12) return;

			console.log('created at: ', typeof game.createdAt);

			if (
				game.createdAt instanceof Timestamp &&
				isBefore(timeSpan, game.createdAt.toDate())
			) {
				setDates((dates) => [
					...dates,
					format(game.createdAt.toDate(), 'MMM dd'),
				]);
				if (game.black.uid === uid) {
					setData((data) => [...data, game.black.rating]);
				} else {
					setData((data) => [...data, game.white.rating]);
				}
			}
			i += 1;
		}
	}, []);

	return (
		<StatsContainer>
			<LineChart title="Rating Over Time" labels={dates} data={data} />
		</StatsContainer>
	);
};

export default RatingOverTime;
