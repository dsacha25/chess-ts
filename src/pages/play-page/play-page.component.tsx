import React, { useEffect } from 'react';
import ActiveGameError from '../../components/games/active-games/active-game-error/active-game-error.component';
import AuxiliaryPanel from '../../components/games/game-play/aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../components/games/game-play/chessboard/chessboard-display.component';
import DesktopGameLayout from '../../components/games/game-play/layout/desktop-game-layout/desktop-game-layout.component';
import MobileGameLayout from '../../components/games/game-play/layout/mobile-game-layout/mobile-game-layout.component';
import GameToolbar from '../../components/toolbars/game-toolbar/game-toolbar.component';
import MobileGameToolbar from '../../components/toolbars/mobile-game-toolbar/mobile-game-toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import useWindowSize from '../../hooks/use-window-size/use-window-size.hook';
import { selectActiveGame } from '../../redux/game/game.selector';
import { PlayContainer } from './play-page.styles';

const PlayPage = () => {
	const { setGameType } = useActions();
	const { width } = useWindowSize();

	const activeGame = useSelector((state) => selectActiveGame(state));

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
