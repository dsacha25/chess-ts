import React from 'react';
import Title from '../../common/title/title.styles';
import { StatsContainer } from './stats-tab.styles';

const StatsTab = () => {
	return (
		<StatsContainer>
			<Title>Stats Page</Title>
			<p>A comprehensive analysis of how shitty you are.</p>
			<p>
				Spoiler alert, its a lot. <br /> W: 0 L: 69
			</p>
			<p>Also eat a dick.</p>
		</StatsContainer>
	);
};

export default StatsTab;
