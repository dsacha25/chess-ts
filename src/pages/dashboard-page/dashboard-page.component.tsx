import React from 'react';
import ComponentSwitcher from '../../components/common/component-switcher/component-switcher.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectDashboardIndex } from '../../redux/indexes/indexes.selector';
import { DashboardContainer } from './dashboard-page.styles';

const DashboardPage = () => {
	const index = useSelector((state) => selectDashboardIndex(state));
	return (
		<DashboardContainer>
			<Toolbar />
			<ComponentSwitcher index={index}>
				<div>Fuck You</div>
				<div>Enemies</div>
				<div>Inadequacies</div>
				<div>Profile</div>
			</ComponentSwitcher>
		</DashboardContainer>
	);
};

export default DashboardPage;
