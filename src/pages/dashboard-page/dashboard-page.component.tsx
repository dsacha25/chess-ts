import React from 'react';
import ComponentSwitcher from '../../components/common/component-switcher/component-switcher.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import { DashboardContainer } from './dashboard-page.styles';

const DashboardPage = () => {
	return (
		<DashboardContainer>
			<Toolbar />
			<ComponentSwitcher index={0}>
				<div>Fuck You</div>
				<div>Enemies</div>
				<div>Inadequacies</div>
				<div>Profile</div>
			</ComponentSwitcher>
		</DashboardContainer>
	);
};

export default DashboardPage;
