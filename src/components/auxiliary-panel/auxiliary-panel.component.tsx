import React from 'react';
import Title from '../common/title/title.styles';
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
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectPendingMove, selectTurns } from '../../redux/game/game.selector';
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import useActions from '../../hooks/use-actions/use-actions.hook';

const AuxiliaryPanel = () => {
	const history = useSelector((state) => selectTurns(state));
	const pendingMove = useSelector((state) => selectPendingMove(state));

	const { makeConfirmedMoveStart, rejectPendingMove } = useActions();

	const handleConfirmMove = () => {
		makeConfirmedMoveStart();
	};

	const handleRejectMove = () => {
		rejectPendingMove();
	};

	return (
		<AuxiliaryPanelContainer>
			<Title margin="0" fontSize="30px" color="light">
				Move List
			</Title>
			<PanelInfoContainer>
				<ul>
					{history.map((move, i) => (
						<li key={i}>
							W:{move[0]} B:{move[1]}
						</li>
					))}
				</ul>
			</PanelInfoContainer>

			<PanelControlsContainer>
				<PanelButton color="warn">Resign</PanelButton>
				<PanelButton color="light">Draw</PanelButton>
				<PanelButton color="light" inverted>
					<BiMessage size="60%" />
				</PanelButton>
			</PanelControlsContainer>
			{pendingMove && (
				<ConfirmMoveContainer>
					<ConfirmMoveButton onClick={handleConfirmMove} color="main">
						<FiCheck size="30px" />
					</ConfirmMoveButton>
					<RejectMoveButton onClick={handleRejectMove} color="secondary">
						<IoClose size="30px" />
					</RejectMoveButton>
				</ConfirmMoveContainer>
			)}
		</AuxiliaryPanelContainer>
	);
};

export default AuxiliaryPanel;
