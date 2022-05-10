import React, { useEffect } from 'react';
import AuxiliaryPanel from '../../components/games/aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../components/games/chessboard/chessboard-display.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { AnalysisContainer } from './analysis-page.styles';

const AnalysisPage = () => {
	const { clearEnemyInfo, clearActiveGame } = useActions();

	useEffect(() => {
		clearEnemyInfo();
		clearActiveGame();

		// eslint-disable-next-line
	}, []);

	return (
		<AnalysisContainer>
			<Toolbar />
			<ChessboardDisplay />
			<AuxiliaryPanel />
		</AnalysisContainer>
	);
};

export default AnalysisPage;
