import React, { Fragment } from 'react';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectActiveGame } from '../../../../../redux/game/game.selector';
import { selectMobileGameIndex } from '../../../../../redux/indexes/indexes.selector';
import ActiveGameError from '../../../active-games/active-game-error/active-game-error.component';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../chessboard/chessboard-display.component';
import { MobileGameLayoutContainer } from './mobile-game-layout.styles';

const MobileGameLayout = () => {
	const activeGame = useSelector((state) => selectActiveGame(state));
	const index = useSelector((state) => selectMobileGameIndex(state));

	return (
		<MobileGameLayoutContainer>
			{index ? (
				<AuxiliaryPanel />
			) : (
				<Fragment>
					{activeGame ? <ChessboardDisplay /> : <ActiveGameError />}
				</Fragment>
			)}
		</MobileGameLayoutContainer>
	);
};

export default MobileGameLayout;
