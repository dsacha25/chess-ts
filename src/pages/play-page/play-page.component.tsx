import React from 'react';
import ActiveGameError from '../../components/active-games/active-game-error/active-game-error.component';
import AuxiliaryPanel from '../../components/games/aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../components/games/chessboard/chessboard-display.component';
import GameToolbar from '../../components/games/game-toolbar/game-toolbar.component';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectActiveGame } from '../../redux/game/game.selector';
import { PlayContainer } from './play-page.styles';

const PlayPage = () => {
	const activeGame = useSelector((state) => selectActiveGame(state));

	return (
		<PlayContainer>
			<GameToolbar />
			{activeGame ? <ChessboardDisplay /> : <ActiveGameError />}
			<AuxiliaryPanel />
		</PlayContainer>
	);
};

export default PlayPage;
