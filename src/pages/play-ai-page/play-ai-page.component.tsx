import React, { useEffect } from 'react';
import AiLevelSelect from '../../components/games/ai-level-select/ai-level-select.component';
import AuxiliaryPanel from '../../components/games/game-play/aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../components/games/game-play/chessboard/chessboard-display.component';
import GameToolbar from '../../components/games/game-play/game-toolbar/game-toolbar.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectAiLevel } from '../../redux/game/game.selector';
import { PlayAiContainer } from './play-ai-page.styles';

const PlayAiPage = () => {
	const aiLevel = useSelector((state) => selectAiLevel(state));
	const { setGameType, setAiLevel } = useActions();

	useEffect(() => {
		setGameType('ai');

		return () => {
			setAiLevel(null);
		};

		// eslint-disable-next-line
	}, []);

	return (
		<PlayAiContainer>
			<GameToolbar />
			{!aiLevel ? <AiLevelSelect /> : <ChessboardDisplay />}
			<AuxiliaryPanel />
		</PlayAiContainer>
	);
};

export default PlayAiPage;
