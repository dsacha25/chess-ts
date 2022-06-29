import { find } from 'lodash';
import React, { useEffect } from 'react';

import DesktopGameLayout from '../../components/games/game-play/layout/desktop-game-layout/desktop-game-layout.component';
import MobileGameLayout from '../../components/games/game-play/layout/mobile-game-layout/mobile-game-layout.component';
import GameToolbar from '../../components/toolbars/game-toolbar/game-toolbar.component';
import MobileGameToolbar from '../../components/toolbars/mobile-game-toolbar/mobile-game-toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import useWindowSize from '../../hooks/use-window-size/use-window-size.hook';
import { selectActiveGame } from '../../redux/game/game.selector';
import { selectUserUID } from '../../redux/user/user.selector';
import { PlayContainer } from './play-page.styles';

const PlayPage = () => {
	const { setGameType, openActiveGameListener, fetchEnemyInfoStart } =
		useActions();
	const { width } = useWindowSize();
	const activeGame = useSelector((state) => selectActiveGame(state));
	const uid = useSelector((state) => selectUserUID(state));

	useEffect(() => {
		setGameType('online');

		if (activeGame) {
			console.log('GAME EXISTS');
			openActiveGameListener();

			if (activeGame) {
				const enemyUID = find(activeGame.users, (player) => player !== uid);
				console.log('ENEMY UID: ', enemyUID);
				if (enemyUID) {
					fetchEnemyInfoStart(enemyUID);
				}
			}
		}

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
