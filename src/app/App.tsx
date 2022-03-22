import React from 'react';
import './App.css';
import { SiteContainer } from './app.styles';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home-page/home-page.component';
import Paths from '../utils/types/paths/paths';
import CreateAccountPage from '../pages/create-account-page/create-account-page.component';
import LogInPage from '../pages/log-in-page/log-in-page.component';
import Header from '../hooks/header/header.component';

function App() {
	return (
		<div className="App">
			<SiteContainer>
				<Header />
				<Routes>
					<Route index element={<HomePage />} />
					<Route path={Paths.CREATE_ACCOUNT} element={<CreateAccountPage />} />
					<Route path={Paths.LOGIN} element={<LogInPage />} />
				</Routes>
			</SiteContainer>
		</div>
	);
}

export default App;
