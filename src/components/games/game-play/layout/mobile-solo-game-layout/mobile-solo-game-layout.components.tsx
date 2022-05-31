import React from 'react';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectMobileGameIndex } from '../../../../../redux/indexes/indexes.selector';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import ChessboardDisplay from '../../chessboard/chessboard-display.component';
import { MobileGameLayoutContainer } from '../mobile-game-layout/mobile-game-layout.styles';

const MobileSoloGameLayout = () => {
	const index = useSelector((state) => selectMobileGameIndex(state));

	return (
		<MobileGameLayoutContainer>
			{index ? <AuxiliaryPanel /> : <ChessboardDisplay />}
		</MobileGameLayoutContainer>
	);
};

export default MobileSoloGameLayout;
