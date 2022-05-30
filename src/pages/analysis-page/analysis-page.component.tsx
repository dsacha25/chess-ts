import React, { useEffect } from 'react';
import AuxiliaryPanel from '../../components/games/game-play/aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../components/games/game-play/chessboard/chessboard-display.component';
import GameToolbar from '../../components/toolbars/game-toolbar/game-toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import useQuery from '../../hooks/use-query/use-query.hook';
import { AnalysisContainer } from './analysis-page.styles';

const AnalysisPage = () => {
	const game = useQuery('game');
	const { clearEnemyInfo, clearActiveGame, setInactiveGameByID, setGameType } =
		useActions();

	useEffect(() => {
		clearEnemyInfo();
		clearActiveGame();
		setGameType('solo');

		if (game) {
			setInactiveGameByID(game);
		}

		// eslint-disable-next-line
	}, []);

	return (
		<AnalysisContainer>
			<GameToolbar />
			<ChessboardDisplay />
			{/* <AuxiliaryPanel /> */}
		</AnalysisContainer>
	);
};

export default AnalysisPage;
