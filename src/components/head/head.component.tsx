import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { WebsiteColors } from './types';

const Head = () => {
	const { pathname } = useLocation();
	const colors: WebsiteColors = {
		default: '#E9E4F0',
		createAccount: '#bccbf2',
		dashboard: '#b1b7d2',
	};

	const [color, setColor] = useState(colors.default);

	useEffect(() => {
		console.log('LOCATION: ', pathname);

		if (pathname !== '/create-account' && pathname !== '/login') {
			setColor(colors.default);
		}

		if (pathname === '/create-account' || pathname === '/login') {
			setColor(colors.createAccount);
		}

		if (pathname === '/dashboard') {
			setColor(colors.dashboard);
		}

		// eslint-disable-next-line
	}, [pathname]);
	return (
		<Helmet>
			<meta name="theme-color" content={color} />
		</Helmet>
	);
};

export default Head;
