import React, { useEffect } from 'react';
import DesktopSoloGameLayout from '../../components/games/game-play/layout/desktop-solo-game-layout/desktop-solo-game-layout.component';
import MobileSoloGameLayout from '../../components/games/game-play/layout/mobile-solo-game-layout/mobile-solo-game-layout.components';
import GameToolbar from '../../components/toolbars/game-toolbar/game-toolbar.component';
import MobileGameToolbar from '../../components/toolbars/mobile-game-toolbar/mobile-game-toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import useQuery from '../../hooks/use-query/use-query.hook';
import useWindowSize from '../../hooks/use-window-size/use-window-size.hook';
import { AnalysisContainer } from './analysis-page.styles';

const AnalysisPage = () => {
	const game = useQuery('game');
	const { clearEnemyInfo, clearActiveGame, setInactiveGameByID, setGameType } =
		useActions();
	const { width } = useWindowSize();

	useEffect(() => {
		clearEnemyInfo();
		clearActiveGame();
		setGameType('solo');

		if (game) {
			setInactiveGameByID(game);
		}

		// eslint-disable-next-line
	}, []);

	return (
		<AnalysisContainer>
			{width <= 980 ? <MobileGameToolbar /> : <GameToolbar />}
			{width <= 980 ? <MobileSoloGameLayout /> : <DesktopSoloGameLayout />}
		</AnalysisContainer>
	);
};

export default AnalysisPage;
