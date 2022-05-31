import React, { Fragment } from 'react';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../chessboard/chessboard-display.component';

const DesktopSoloGameLayout = () => {
	return (
		<Fragment>
			<ChessboardDisplay />
			<AuxiliaryPanel />
		</Fragment>
	);
};

export default DesktopSoloGameLayout;
