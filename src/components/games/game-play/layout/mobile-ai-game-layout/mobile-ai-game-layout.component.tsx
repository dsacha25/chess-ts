import React, { Fragment } from 'react';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectAiLevel } from '../../../../../redux/game/game.selector';
import { selectMobileGameIndex } from '../../../../../redux/indexes/indexes.selector';
import AiLevelSelect from '../../../pre-game-interfaces/ai-level-select/ai-level-select.component';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import AiChessboard from '../../boards/ai-chessboard/ai-chessboard.component';
import ChessboardDisplay from '../../chessboard/chessboard-display.component';
import { MobileGameLayoutContainer } from '../mobile-game-layout/mobile-game-layout.styles';

const MobileAiGameLayout = () => {
	const index = useSelector((state) => selectMobileGameIndex(state));
	const aiLevel = useSelector((state) => selectAiLevel(state));

	return (
		<MobileGameLayoutContainer>
			{index ? (
				<AuxiliaryPanel />
			) : (
				<Fragment>
					{aiLevel === null ? <AiLevelSelect /> : <AiChessboard />}
				</Fragment>
			)}
		</MobileGameLayoutContainer>
	);
};

export default MobileAiGameLayout;
