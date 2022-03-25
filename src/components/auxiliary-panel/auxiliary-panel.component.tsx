import React from 'react';
import Title from '../common/title/title.styles';
import {
	AuxiliaryPanelContainer,
	PanelButton,
	PanelControlsContainer,
	PanelInfoContainer,
} from './auxiliary-panel.styles';

import { BiMessage } from 'react-icons/bi';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectGameHistory, selectTurns } from '../../redux/game/game.selector';

const AuxiliaryPanel = () => {
	const history = useSelector((state) => selectTurns(state));

	console.log('HISTORY: ', history);

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
		</AuxiliaryPanelContainer>
	);
};

export default AuxiliaryPanel;
