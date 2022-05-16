import React, { useEffect, useRef } from 'react';
import Title from '../../../../common/title/title.styles';
import {
	AuxiliaryPanelContainer,
	ConfirmMoveButton,
	ConfirmMoveContainer,
	PanelButton,
	PanelControlsContainer,
	PanelInfoContainer,
	RejectMoveButton,
} from './auxiliary-panel.styles';

import { BiMessage } from 'react-icons/bi';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectGameLoadingState,
	selectPendingMove,
	selectTurns,
} from '../../../../../redux/game/game.selector';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import GameHistory from '../game-history/game-history.component';
import { selectAuxPanelIndex } from '../../../../../redux/indexes/indexes.selector';
import GameChat from '../chat/game-chat/game-chat.component';
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { FaChessBishop } from 'react-icons/fa';
import Spinner from '../../../../common/spinner/spinner.component';

const AuxiliaryPanel = () => {
	const history = useSelector((state) => selectTurns(state));
	const pendingMove = useSelector((state) => selectPendingMove(state));
	const index = useSelector((state) => selectAuxPanelIndex(state));
	const loading = useSelector((state) => selectGameLoadingState(state));

	const historyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (historyRef.current) {
			historyRef.current.scrollTop = historyRef.current.scrollHeight;
			console.log('ref:', historyRef.current.scrollHeight);
		}
	}, [historyRef]);

	const { makeConfirmedMoveStart, rejectPendingMove, setAuxPanelIndex } =
		useActions();

	const handleConfirmMove = () => {
		makeConfirmedMoveStart();
	};

	const handleRejectMove = () => {
		rejectPendingMove();
	};

	//// TODO:
	// * Handle Analysis Page layout
	// * Seperate Components for
	// * * ActiveGameControls & InactiveGameControls
	// * * * *  Inactive controls - Arrows cycling through all moves.
	// * * * *  Do I need to store each FEN string for every move?

	return (
		<AuxiliaryPanelContainer>
			<Title margin="0" fontSize="30px" color="light">
				{!index ? 'Move List' : 'Chat'}
			</Title>
			<PanelInfoContainer ref={historyRef}>
				{!index ? <GameHistory history={history} /> : <GameChat />}
			</PanelInfoContainer>

			<PanelControlsContainer>
				<PanelButton color="warn">Resign</PanelButton>
				<PanelButton color="light">Draw</PanelButton>
				<PanelButton
					color="light"
					onClick={() => setAuxPanelIndex(!index)}
					inverted
				>
					{index ? <FaChessBishop size="55%" /> : <BiMessage size="60%" />}
				</PanelButton>
			</PanelControlsContainer>
			{pendingMove && (
				<ConfirmMoveContainer>
					{loading ? (
						<Spinner size="30px" />
					) : (
						<ConfirmMoveButton onClick={handleConfirmMove} color="main">
							<FiCheck size="30px" />
						</ConfirmMoveButton>
					)}
					<RejectMoveButton onClick={handleRejectMove} color="secondary">
						<IoClose size="30px" />
					</RejectMoveButton>
				</ConfirmMoveContainer>
			)}
		</AuxiliaryPanelContainer>
	);
};

export default AuxiliaryPanel;
