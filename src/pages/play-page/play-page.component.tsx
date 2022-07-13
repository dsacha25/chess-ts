import React, { useEffect, useState } from 'react';
import { find } from 'lodash';
import DesktopGameLayout from '../../components/games/game-play/layout/desktop-game-layout/desktop-game-layout.component';
import MobileGameLayout from '../../components/games/game-play/layout/mobile-game-layout/mobile-game-layout.component';
import WaitingForOpponentMsg from '../../components/games/pre-game-interfaces/waiting-for-opponent-msg/waiting-for-opponent-msg.component';
import GameToolbar from '../../components/toolbars/game-toolbar/game-toolbar.component';
import MobileGameToolbar from '../../components/toolbars/mobile-game-toolbar/mobile-game-toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import useQuery from '../../hooks/use-query/use-query.hook';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import useWindowSize from '../../hooks/use-window-size/use-window-size.hook';
import { selectActiveGame } from '../../redux/game/game.selector';
import { selectUserUID } from '../../redux/user/user.selector';
import { PlayContainer } from './play-page.styles';

const PlayPage = () => {
	const {
		setGameType,
		openActiveGameListener,
		fetchEnemyInfoStart,
		setUserGamePresence,
		fetchGameById,
		clearActiveGame,
	} = useActions();
	const gameUID = useQuery('game');
	const { width } = useWindowSize();
	const activeGame = useSelector((state) => selectActiveGame(state));
	const uid = useSelector((state) => selectUserUID(state));
	const [playersPresent, setPlayersPresent] = useState(false);

	useEffect(() => {
		return () => {
			clearActiveGame();
		};

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (gameUID) {
			clearActiveGame();
			fetchGameById(gameUID);
			setUserGamePresence(true, gameUID);
		}

		return () => {
			if (gameUID) {
				setUserGamePresence(false, gameUID);
			}
		};
		// eslint-disable-next-line
	}, [gameUID]);

	// ==== FIREBASE PRESENCE STATE
	// useEffect(() => {
	// 	if (activeGame) {
	// 		setUserGamePresence(true, activeGame.id);
	// 	}

	// 	return () => {
	// 		if (!activeGame) return;
	// 		setUserGamePresence(false, activeGame.id);
	// 	};

	// 	// eslint-disable-next-line
	// }, []);

	// ==== LOCAL PRESENCE STATE
	useEffect(() => {
		if (!activeGame) return;
		if (
			activeGame.gameMode === 'untimed' ||
			activeGame.gameMode === 'one_day' ||
			activeGame.gameMode === 'three_day'
		) {
			return setPlayersPresent(true);
		}

		if (
			activeGame.blackPresent !== playersPresent ||
			activeGame.whitePresent !== playersPresent
		) {
			// console.log('PRESENCE BLACK: ', activeGame.blackPresent);
			// console.log('PRESENCE WHITE: ', activeGame.whitePresent);

			setPlayersPresent(activeGame.blackPresent && activeGame.whitePresent);
		}

		// eslint-disable-next-line
	}, [activeGame]);

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
			{!activeGame?.gameOver && (
				<WaitingForOpponentMsg playersPresent={playersPresent} />
			)}
		</PlayContainer>
	);
};

export default PlayPage;
