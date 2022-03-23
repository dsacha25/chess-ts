import React from 'react';
import Title from '../common/title/title.styles';
import { AuxiliaryPanelContainer } from './auxiliary-panel.styles';

const AuxiliaryPanel = () => {
	return (
		<AuxiliaryPanelContainer>
			<Title margin="0" fontSize="30px" color="light">
				Game Info
			</Title>
			<p>Stats</p>

			<p>Make a new enemy</p>
		</AuxiliaryPanelContainer>
	);
};

export default AuxiliaryPanel;
