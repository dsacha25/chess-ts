import React from 'react';
import GulagWaitingArea from '../../components/games/pre-game-interfaces/gulag-waiting-area/gulag-waiting-area.component';
import GameToolbar from '../../components/toolbars/game-toolbar/game-toolbar.component';
import MobileGameToolbar from '../../components/toolbars/mobile-game-toolbar/mobile-game-toolbar.component';
import useWindowSize from '../../hooks/use-window-size/use-window-size.hook';

import { GulagPageContainer } from './gulag-page.styles';

const GulagPage = () => {
	const { width } = useWindowSize();

	/**
	 * TODO:
	 * --- ON ENTER: ADD USER TO FIREBASE 'GULAG LIST'
	 * --- QUERY FOR OTHER PLAYERS IN 'GULAG LIST'
	 * --- IF PLAYER FOUND
	 * --- --- OPTIONAL: MATCH USERS BY RATING
	 * --- --- CREATE NEW GAME
	 * --- --- REDIRECT PLAYERS TO PLAY PAGE?
	 */

	return (
		<GulagPageContainer>
			{width <= 980 ? <MobileGameToolbar /> : <GameToolbar />}
			<GulagWaitingArea />
		</GulagPageContainer>
	);
};

export default GulagPage;
