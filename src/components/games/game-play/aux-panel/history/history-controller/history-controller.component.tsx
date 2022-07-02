import React, { memo } from 'react';
import useActions from '../../../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectGameHistory,
	selectMoveIndex,
} from '../../../../../../redux/game/game.selector';
import {
	HistoryControllerContainer,
	HistoryNavButton,
} from './history-controller.styles';

import {
	MdOutlineSkipPrevious,
	MdChevronLeft,
	MdChevronRight,
	MdOutlineSkipNext,
} from 'react-icons/md';

const HistoryController = () => {
	const moveIndex = useSelector((state) => selectMoveIndex(state));
	const history = useSelector((state) => selectGameHistory(state));
	const { getDefaultPosition, getPreviousMove, getNextMove, getLatestMove } =
		useActions();

	return (
		<HistoryControllerContainer>
			<HistoryNavButton
				onClick={() => getDefaultPosition()}
				color="main"
				disabled={moveIndex === -1}
			>
				<MdOutlineSkipPrevious size="30px" />
			</HistoryNavButton>
			<HistoryNavButton
				onClick={() => getPreviousMove()}
				disabled={moveIndex === -1}
				color="main"
			>
				<MdChevronLeft size="30px" />
			</HistoryNavButton>
			<HistoryNavButton
				onClick={() => getNextMove()}
				disabled={moveIndex === history.length - 1}
				color="main"
			>
				<MdChevronRight size="30px" />
			</HistoryNavButton>
			<HistoryNavButton
				onClick={() => getLatestMove()}
				disabled={moveIndex === history.length - 1}
				color="main"
			>
				<MdOutlineSkipNext size="30px" />
			</HistoryNavButton>
		</HistoryControllerContainer>
	);
};

export default memo(HistoryController);
