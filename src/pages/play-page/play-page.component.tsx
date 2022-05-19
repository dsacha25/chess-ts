import React, { useEffect } from 'react';
import ActiveGameError from '../../components/games/active-games/active-game-error/active-game-error.component';
import AuxiliaryPanel from '../../components/games/game-play/aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../components/games/game-play/chessboard/chessboard-display.component';
import GameToolbar from '../../components/games/game-play/game-toolbar/game-toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectActiveGame } from '../../redux/game/game.selector';
import { PlayContainer } from './play-page.styles';

const PlayPage = () => {
	const activeGame = useSelector((state) => selectActiveGame(state));

	const { setGameType } = useActions();

	useEffect(() => {
		setGameType('online');

		// eslint-disable-next-line
	}, []);

	return (
		<PlayContainer>
			<GameToolbar />
			{activeGame ? <ChessboardDisplay /> : <ActiveGameError />}
			<AuxiliaryPanel />
		</PlayContainer>
	);
};

export default PlayPage;
