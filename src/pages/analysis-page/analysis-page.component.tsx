import React from 'react';
import AuxiliaryPanel from '../../components/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../components/chessboard/chessboard-display.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import { AnalysisContainer } from './analysis-page.styles';

const AnalysisPage = () => {
	return (
		<AnalysisContainer>
			<Toolbar />
			<ChessboardDisplay />
			<AuxiliaryPanel />
		</AnalysisContainer>
	);
};

export default AnalysisPage;
