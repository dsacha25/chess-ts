import React, { Fragment } from 'react';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectActiveGame } from '../../../../../redux/game/game.selector';
import ActiveGameError from '../../../active-games/active-game-error/active-game-error.component';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import OnlineChessboard from '../../boards/online-chessboard/online-chessboard.component';

const DesktopGameLayout = () => {
	const activeGame = useSelector((state) => selectActiveGame(state));

	return (
		<Fragment>
			{activeGame ? <OnlineChessboard /> : <ActiveGameError />}
			<AuxiliaryPanel />
		</Fragment>
	);
};

export default DesktopGameLayout;
