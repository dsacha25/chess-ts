import React, { useEffect } from 'react';

import { SiteBackground, SiteContainer } from './app.styles';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home-page/home-page.component';
import Paths from '../utils/types/util/paths/paths';
import CreateAccountPage from '../pages/create-account-page/create-account-page.component';
import LogInPage from '../pages/log-in-page/log-in-page.component';
import Header from '../components/header/header.component';
import PrivateRoute from '../components/common/private-route/private-route.component';
import DashboardPage from '../pages/dashboard-page/dashboard-page.component';
import { useSelector } from '../hooks/use-selector/use-typed-selector.hook';
import { selectUserAuth } from '../redux/user/user.selector';
import useActions from '../hooks/use-actions/use-actions.hook';
import PlayPage from '../pages/play-page/play-page.component';
import AnalysisPage from '../pages/analysis-page/analysis-page.component';
import PlayAiPage from '../pages/play-ai-page/play-ai-page.component';
import Head from '../components/head/head.component';
import GulagPage from '../pages/gulag-page/gulag-page.component';
import ErrorBoundary from '../components/common/error-boundary/error-boundary.component';

function App() {
	const {
		checkUserSession,
		openNotificationListener,
		getChessUserStart,
		setUserStatusStart,
	} = useActions();
	const auth = useSelector((state) => selectUserAuth(state));

	useEffect(() => {
		checkUserSession();

		if (auth) {
			getChessUserStart();
			setUserStatusStart();
		}

		// eslint-disable-next-line
	}, [auth]);

	useEffect(() => {
		if (auth) {
			openNotificationListener();
		}

		// eslint-disable-next-line
	}, [auth]);

	return (
		<SiteContainer>
			<Head />
			<Header />
			<ErrorBoundary>
				<Routes>
					<Route index element={<HomePage />} />
					<Route path={Paths.CREATE_ACCOUNT} element={<CreateAccountPage />} />
					<Route path={Paths.LOGIN} element={<LogInPage />} />
					<Route path={Paths.DASHBOARD} element={<PrivateRoute />}>
						<Route index element={<DashboardPage />} />
					</Route>

					<Route path={Paths.PLAY} element={<PrivateRoute />}>
						<Route index element={<PlayPage />} />
					</Route>

					<Route path={Paths.GULAG} element={<PrivateRoute />}>
						<Route index element={<GulagPage />} />
					</Route>

					<Route path={Paths.ANALYSIS} element={<PrivateRoute />}>
						<Route index element={<AnalysisPage />} />
					</Route>

					<Route path={Paths.AI} element={<PrivateRoute />}>
						<Route index element={<PlayAiPage />} />
					</Route>
				</Routes>
			</ErrorBoundary>
			<SiteBackground />
		</SiteContainer>
	);
}

export default App;
