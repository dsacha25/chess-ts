import React from 'react';
import { ToolbarButton, ToolbarContainer } from './toolbar.styles';

const Toolbar = () => {
	return (
		<ToolbarContainer>
			Toolbar
			<ToolbarButton color="light">Fuck You</ToolbarButton>
			<ToolbarButton color="light">Enemies</ToolbarButton>
			<ToolbarButton color="light">Inadequacies</ToolbarButton>
			<ToolbarButton color="light">Profile</ToolbarButton>
		</ToolbarContainer>
	);
};

export default Toolbar;
