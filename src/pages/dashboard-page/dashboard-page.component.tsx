import React from 'react';
import ComponentSwitcher from '../../components/common/component-switcher/component-switcher.component';
import ChallengeTab from '../../components/dashboard/challenge-tab/challenge-tab.component';
import EnemiesTab from '../../components/dashboard/enemies-tab/enemies-tab.component';
import ProfileTab from '../../components/dashboard/profile-tab/profile-tab.component';
import StatsTab from '../../components/dashboard/stats-tab/stats-tab.component';
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
				<ChallengeTab />
				<EnemiesTab />
				<StatsTab />
				<ProfileTab />
			</ComponentSwitcher>
		</DashboardContainer>
	);
};

export default DashboardPage;
