import React from 'react';
import Title from '../common/title/title.styles';
import {
	AuxiliaryPanelContainer,
	PanelButton,
	PanelControlsContainer,
	PanelInfoContainer,
} from './auxiliary-panel.styles';

import { BiMessage } from 'react-icons/bi';

const AuxiliaryPanel = () => {
	return (
		<AuxiliaryPanelContainer>
			<Title margin="0" fontSize="30px" color="light">
				Move List
			</Title>
			<PanelInfoContainer>
				<ul>
					<li>c4</li>
					<li>f6</li>
					<li>Kc3</li>
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
