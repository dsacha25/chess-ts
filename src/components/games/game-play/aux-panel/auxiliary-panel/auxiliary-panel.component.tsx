import React, { useEffect, useRef, useState } from 'react';
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
	selectChatUnread,
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
import { NotifButtonFlag } from '../../../../notifications/notification-flag/notification-flag.styles';
import { AuxActions } from './types';

const AuxiliaryPanel = () => {
	const history = useSelector((state) => selectTurns(state));
	const pendingMove = useSelector((state) => selectPendingMove(state));
	const index = useSelector((state) => selectAuxPanelIndex(state));
	const loading = useSelector((state) => selectGameLoadingState(state));
	const chatUnread = useSelector((state) => selectChatUnread(state));

	const [action, setAction] = useState<AuxActions>(AuxActions.MOVE);
	const historyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (historyRef.current) {
			historyRef.current.scrollTop = historyRef.current.scrollHeight;
		}
	}, [historyRef]);

	const {
		makeConfirmedMoveStart,
		rejectPendingMove,
		setAuxPanelIndex,
		openChatListenerStart,
		readChatMessage,
	} = useActions();

	const handleConfirmAction = () => {
		switch (action) {
			case AuxActions.MOVE:
			default:
				return makeConfirmedMoveStart();
		}
	};

	const handleRejectAction = () => {
		switch (action) {
			case AuxActions.MOVE:
			default:
				return rejectPendingMove();
		}
	};

	const handlePanelToggle = () => {
		setAuxPanelIndex(!index);

		if (!index && chatUnread) {
			readChatMessage();
		}
	};

	useEffect(() => {
		openChatListenerStart();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (index && chatUnread) {
			readChatMessage();
		}

		// eslint-disable-next-line
	}, [index, chatUnread]);

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
				<PanelButton color="light" onClick={handlePanelToggle} inverted>
					{!index && chatUnread && <NotifButtonFlag unread={chatUnread} />}
					{index ? <FaChessBishop size="55%" /> : <BiMessage size="60%" />}
				</PanelButton>
			</PanelControlsContainer>
			{pendingMove && (
				<ConfirmMoveContainer>
					<ConfirmMoveButton onClick={handleConfirmAction} color="main">
						{loading ? <Spinner size="40px" /> : <FiCheck size="30px" />}
					</ConfirmMoveButton>
					<RejectMoveButton onClick={handleRejectAction} color="secondary">
						<IoClose size="30px" />
					</RejectMoveButton>
				</ConfirmMoveContainer>
			)}
		</AuxiliaryPanelContainer>
	);
};

export default AuxiliaryPanel;
