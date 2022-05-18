import React, { useEffect } from 'react';
import AuxiliaryPanel from '../../components/games/game-play/aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../components/games/game-play/chessboard/chessboard-display.component';
import GameToolbar from '../../components/games/game-play/game-toolbar/game-toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import useQuery from '../../hooks/use-query/use-query.hook';
import { AnalysisContainer } from './analysis-page.styles';

const AnalysisPage = () => {
	const game = useQuery('game');
	const { clearEnemyInfo, clearActiveGame, setInactiveGameByID } = useActions();

	useEffect(() => {
		clearEnemyInfo();
		clearActiveGame();

		if (game) {
			setInactiveGameByID(game);
		}

		console.log('GAME UID:  ', game);

		// eslint-disable-next-line
	}, []);

	return (
		<AnalysisContainer>
			<GameToolbar />
			<ChessboardDisplay />
			<AuxiliaryPanel />
		</AnalysisContainer>
	);
};

export default AnalysisPage;
