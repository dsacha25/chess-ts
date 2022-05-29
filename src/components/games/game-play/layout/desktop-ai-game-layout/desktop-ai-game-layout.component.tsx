import React, { Fragment, useEffect } from 'react';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectAiLevel } from '../../../../../redux/game/game.selector';
import GameToolbar from '../../../../toolbars/game-toolbar/game-toolbar.component';
import AiLevelSelect from '../../../ai-level-select/ai-level-select.component';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../chessboard/chessboard-display.component';

const DesktopAIGameLayout = () => {
	const aiLevel = useSelector((state) => selectAiLevel(state));

	const { setGameType, setAiLevel, clearEnemyInfo } = useActions();

	useEffect(() => {
		setGameType('ai');
		clearEnemyInfo();

		return () => {
			setAiLevel(null);
		};
	}, []);

	return (
		<Fragment>
			{aiLevel === null ? <AiLevelSelect /> : <ChessboardDisplay />}
			<AuxiliaryPanel />
		</Fragment>
	);
};

export default DesktopAIGameLayout;
