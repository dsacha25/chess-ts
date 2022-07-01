import React, { Fragment } from 'react';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import SoloChessboard from '../../boards/solo-chessboard/solo-chessboard.component';

const DesktopSoloGameLayout = () => {
	return (
		<Fragment>
			<SoloChessboard />
			<AuxiliaryPanel />
		</Fragment>
	);
};

export default DesktopSoloGameLayout;
