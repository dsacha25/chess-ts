import React, { useEffect } from 'react';
import AuxiliaryPanel from '../../components/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../components/chessboard/chessboard-display.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { AnalysisContainer } from './analysis-page.styles';

const AnalysisPage = () => {
	const { clearEnemyInfo } = useActions();

	useEffect(() => {
		clearEnemyInfo();

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
