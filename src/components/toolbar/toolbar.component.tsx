import React from 'react';
import useActions from '../../hooks/use-actions/use-actions.hook';
import ToolbarChip from '../chips/toolbar-chip/toolbar-chip.component';
import { ToolbarButton, ToolbarContainer } from './toolbar.styles';

const Toolbar = () => {
	const { setDashboardIndex } = useActions();
	return (
		<ToolbarContainer>
			<ToolbarChip />
			<ToolbarButton onClick={() => setDashboardIndex(0)} color="light">
				Fuck You
			</ToolbarButton>
			<ToolbarButton onClick={() => setDashboardIndex(1)} color="light">
				Enemies
			</ToolbarButton>
			<ToolbarButton onClick={() => setDashboardIndex(2)} color="light">
				Inadequacies
			</ToolbarButton>
			<ToolbarButton onClick={() => setDashboardIndex(3)} color="light">
				Profile
			</ToolbarButton>
		</ToolbarContainer>
	);
};

export default Toolbar;
