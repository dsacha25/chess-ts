import React, { useEffect } from 'react';
import './App.css';
import { SiteContainer } from './app.styles';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home-page/home-page.component';
import Paths from '../utils/types/paths/paths';
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

function App() {
	const { checkUserSession, openNotificationListener, getChessUserStart } =
		useActions();
	const auth = useSelector((state) => selectUserAuth(state));

	useEffect(() => {
		// if (!auth) {
		checkUserSession();
		getChessUserStart();

		// eslint-disable-next-line
	}, [auth]);

	useEffect(() => {
		if (auth) {
			openNotificationListener();
		}

		// eslint-disable-next-line
	}, [auth]);

	return (
		<div className="App">
			<SiteContainer>
				<Header />
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

					<Route path={Paths.ANALYSIS} element={<PrivateRoute />}>
						<Route index element={<AnalysisPage />} />
					</Route>
				</Routes>
			</SiteContainer>
		</div>
	);
}

export default App;
