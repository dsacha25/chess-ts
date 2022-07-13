import React, { useEffect } from 'react';

import GameToolbar from '../../components/toolbars/game-toolbar/game-toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import MobileGameToolbar from '../../components/toolbars/mobile-game-toolbar/mobile-game-toolbar.component';
import useWindowSize from '../../hooks/use-window-size/use-window-size.hook';
import { PlayAiContainer } from './play-ai-page.styles';
import MobileAiGameLayout from '../../components/games/game-play/layout/mobile-ai-game-layout/mobile-ai-game-layout.component';
import DesktopAIGameLayout from '../../components/games/game-play/layout/desktop-ai-game-layout/desktop-ai-game-layout.component';

const PlayAiPage = () => {
	const { setGameType, setAiLevel, clearActiveGame, clearEnemyInfo } =
		useActions();
	const { width } = useWindowSize();

	useEffect(() => {
		setGameType('ai');

		clearActiveGame();
		clearEnemyInfo();

		return () => {
			setAiLevel(null);
		};

		// eslint-disable-next-line
	}, []);

	return (
		<PlayAiContainer>
			{width <= 980 ? <MobileGameToolbar /> : <GameToolbar />}
			{width <= 980 ? <MobileAiGameLayout /> : <DesktopAIGameLayout />}
		</PlayAiContainer>
	);
};

export default PlayAiPage;
