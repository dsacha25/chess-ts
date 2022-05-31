import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { WebsiteColors } from './types';

const Head = () => {
	const { pathname } = useLocation();
	const colors: WebsiteColors = {
		default: '#f1f7ff',
		createAccount: '#bccbf2',
		dashboard: '#b1b7d2',
	};

	const [color, setColor] = useState(colors.default);

	useEffect(() => {
		setColor(colors.default);

		// eslint-disable-next-line
	}, [pathname]);

	return (
		<Helmet>
			<meta name="theme-color" content={color} />
		</Helmet>
	);
};

export default Head;
