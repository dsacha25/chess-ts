import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import Title from '../../../../common/title/title.styles';
import {
	AuxiliaryPanelContainer,
	ConfirmActionButton,
	ConfirmActionContainer,
	PanelButton,
	PanelControlsContainer,
	PanelInfoContainer,
	RejectActionButton,
} from './auxiliary-panel.styles';

import { BiMessage } from 'react-icons/bi';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import {
	selectChatUnread,
	selectGameLoadingState,
	selectIsGameOver,
	selectPendingMove,
	selectTurns,
} from '../../../../../redux/game/game.selector';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import GameHistory from '../history/game-history/game-history.component';
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
	const isGameOver = useSelector((state) => selectIsGameOver(state));

	const [action, setAction] = useState<AuxActions>(AuxActions.MOVE);
	const [open, setOpen] = useState(false);
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
		resignGame,
		requestDraw,
	} = useActions();

	const handleConfirmAction = () => {
		setAction(AuxActions.MOVE);
		switch (action) {
			case AuxActions.RESIGN:
				setOpen(false);
				return resignGame();
			case AuxActions.DRAW:
				setOpen(false);
				return requestDraw();
			case AuxActions.MOVE:
			default:
				return makeConfirmedMoveStart();
		}
	};

	const handleRejectAction = () => {
		setAction(AuxActions.MOVE);
		switch (action) {
			case AuxActions.RESIGN:
			case AuxActions.DRAW:
				return setOpen(false);
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

	const handleOpenActionConfirmation = (e: MouseEvent<HTMLButtonElement>) => {
		const id = e.currentTarget.id;
		setOpen(true);

		if (id === 'resign') {
			setAction(AuxActions.RESIGN);
		}

		if (id === 'draw') {
			setAction(AuxActions.DRAW);
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

	useEffect(() => {
		if (pendingMove) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [pendingMove]);

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
				<PanelButton
					id="resign"
					color="warn"
					onClick={handleOpenActionConfirmation}
					disabled={action === AuxActions.RESIGN || isGameOver}
				>
					Resign
				</PanelButton>
				<PanelButton
					id="draw"
					color="light"
					onClick={handleOpenActionConfirmation}
					disabled={action === AuxActions.DRAW || isGameOver}
				>
					Draw
				</PanelButton>
				<PanelButton color="light" onClick={handlePanelToggle} inverted>
					{!index && chatUnread && <NotifButtonFlag unread={chatUnread} />}
					{index ? <FaChessBishop size="55%" /> : <BiMessage size="60%" />}
				</PanelButton>
			</PanelControlsContainer>

			{open && (
				<ConfirmActionContainer>
					<ConfirmActionButton onClick={handleConfirmAction} color="main">
						{loading ? <Spinner size="40px" /> : <FiCheck size="30px" />}
					</ConfirmActionButton>
					<RejectActionButton onClick={handleRejectAction} color="secondary">
						<IoClose size="30px" />
					</RejectActionButton>
				</ConfirmActionContainer>
			)}
		</AuxiliaryPanelContainer>
	);
};

export default AuxiliaryPanel;
