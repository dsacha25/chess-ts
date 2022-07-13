import React, { Fragment, useEffect } from 'react';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectAiLevel } from '../../../../../redux/game/game.selector';
import AiLevelSelect from '../../../pre-game-interfaces/ai-level-select/ai-level-select.component';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import AiChessboard from '../../boards/ai-chessboard/ai-chessboard.component';

const DesktopAIGameLayout = () => {
	const aiLevel = useSelector((state) => selectAiLevel(state));

	const { setGameType, setAiLevel, clearEnemyInfo } = useActions();

	useEffect(() => {
		setGameType('ai');
		clearEnemyInfo();

		return () => {
			setAiLevel(null);
		};

		// eslint-disable-next-line
	}, []);

	return (
		<Fragment>
			{aiLevel === null ? <AiLevelSelect /> : <AiChessboard />}
			<AuxiliaryPanel />
		</Fragment>
	);
};

export default DesktopAIGameLayout;
