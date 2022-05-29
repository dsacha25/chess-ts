import React, { useEffect } from 'react';

import DesktopGameLayout from '../../components/games/game-play/layout/desktop-game-layout/desktop-game-layout.component';
import MobileGameLayout from '../../components/games/game-play/layout/mobile-game-layout/mobile-game-layout.component';
import GameToolbar from '../../components/toolbars/game-toolbar/game-toolbar.component';
import MobileGameToolbar from '../../components/toolbars/mobile-game-toolbar/mobile-game-toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import useWindowSize from '../../hooks/use-window-size/use-window-size.hook';
import { PlayContainer } from './play-page.styles';

const PlayPage = () => {
	const { setGameType } = useActions();
	const { width } = useWindowSize();

	useEffect(() => {
		setGameType('online');

		// eslint-disable-next-line
	}, []);

	return (
		<PlayContainer>
			{width <= 980 ? <MobileGameToolbar /> : <GameToolbar />}
			{width <= 980 ? <MobileGameLayout /> : <DesktopGameLayout />}
		</PlayContainer>
	);
};

export default PlayPage;
