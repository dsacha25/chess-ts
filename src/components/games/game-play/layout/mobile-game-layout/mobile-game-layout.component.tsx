import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectActiveGame,
	selectGameLoadingState,
	selectPendingMove,
} from '../../../../../redux/game/game.selector';
import { selectMobileGameIndex } from '../../../../../redux/indexes/indexes.selector';
import Spinner from '../../../../common/spinner/spinner.component';
import ActiveGameError from '../../../active-games/active-game-error/active-game-error.component';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import {
	ConfirmActionButton,
	ConfirmActionContainer,
	RejectActionButton,
} from '../../aux-panel/auxiliary-panel/auxiliary-panel.styles';
import ChessboardDisplay from '../../chessboard/chessboard-display.component';
import { MobileGameLayoutContainer } from './mobile-game-layout.styles';

import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';

const MobileGameLayout = () => {
	const { makeConfirmedMoveStart, rejectPendingMove } = useActions();
	const activeGame = useSelector((state) => selectActiveGame(state));
	const index = useSelector((state) => selectMobileGameIndex(state));
	const pendingMove = useSelector((state) => selectPendingMove(state));
	const loading = useSelector((state) => selectGameLoadingState(state));
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (pendingMove) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [pendingMove]);

	return (
		<MobileGameLayoutContainer>
			{index ? (
				<AuxiliaryPanel />
			) : (
				<Fragment>
					{activeGame ? <ChessboardDisplay /> : <ActiveGameError />}
				</Fragment>
			)}
			{open && (
				<ConfirmActionContainer>
					<ConfirmActionButton onClick={makeConfirmedMoveStart} color="main">
						{loading ? <Spinner size="40px" /> : <FiCheck size="30px" />}
					</ConfirmActionButton>
					<RejectActionButton onClick={rejectPendingMove} color="secondary">
						<IoClose size="30px" />
					</RejectActionButton>
				</ConfirmActionContainer>
			)}
		</MobileGameLayoutContainer>
	);
};

export default MobileGameLayout;
