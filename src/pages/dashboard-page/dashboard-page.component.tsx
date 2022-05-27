import React from 'react';
import ComponentSwitcher from '../../components/common/component-switcher/component-switcher.component';
import ChallengeTab from '../../components/dashboard/challenge-tab/challenge-tab.component';
import EnemiesTab from '../../components/dashboard/enemies-tab/enemies-tab.component';
import ProfileTab from '../../components/dashboard/profile-tab/profile-tab.component';
import StatsTab from '../../components/dashboard/stats-tab/stats-tab.component';
import MobileToolbar from '../../components/toolbars/mobile-toolbar/mobile-toolbar.component';
import Toolbar from '../../components/toolbars/toolbar/toolbar.component';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import useWindowSize from '../../hooks/use-window-size/use-window-size.hook';
import { selectDashboardIndex } from '../../redux/indexes/indexes.selector';
import { DashboardContainer } from './dashboard-page.styles';

const DashboardPage = () => {
	const index = useSelector((state) => selectDashboardIndex(state));

	const { width } = useWindowSize();

	return (
		<DashboardContainer>
			{width > 980 ? <Toolbar /> : <MobileToolbar />}
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
