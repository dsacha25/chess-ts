import React, { memo, MouseEvent, useEffect, useRef, useState } from 'react';
import Title from '../../../../common/title/title.styles';
import {
	AuxiliaryPanelContainer,
	PanelButton,
	PanelControlsContainer,
	PanelInfoContainer,
} from './auxiliary-panel.styles';

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

import { BiMessage } from 'react-icons/bi';
import { FaChessBishop } from 'react-icons/fa';

import { NotifButtonFlag } from '../../../../notifications/notification-flag/notification-flag.styles';
import { AuxActions } from './types';
import ConfirmActionPrompt from '../confirm-action-prompt/confirm-action-prompt.component';

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
					color="secondary"
					onClick={handleOpenActionConfirmation}
					disabled={action === AuxActions.RESIGN || isGameOver}
				>
					Resign
				</PanelButton>
				<PanelButton
					id="draw"
					color="main"
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
				<ConfirmActionPrompt
					handleConfirm={handleConfirmAction}
					handleReject={handleRejectAction}
					loading={loading}
				/>
			)}
		</AuxiliaryPanelContainer>
	);
};

export default memo(AuxiliaryPanel);
