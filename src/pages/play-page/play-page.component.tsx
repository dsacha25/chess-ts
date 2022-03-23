import React from 'react';
import AuxiliaryPanel from '../../components/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../components/chessboard/chessboard-display.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import { PlayContainer } from './play-page.styles';

const PlayPage = () => {
	return (
		<PlayContainer>
			<Toolbar />
			<ChessboardDisplay />
			<AuxiliaryPanel />
		</PlayContainer>
	);
};

export default PlayPage;
