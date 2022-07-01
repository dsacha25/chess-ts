import React from 'react';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import { selectMobileGameIndex } from '../../../../../redux/indexes/indexes.selector';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import SoloChessboard from '../../boards/solo-chessboard/solo-chessboard.component';
import { MobileGameLayoutContainer } from '../mobile-game-layout/mobile-game-layout.styles';

const MobileSoloGameLayout = () => {
	const index = useSelector((state) => selectMobileGameIndex(state));

	return (
		<MobileGameLayoutContainer>
			{index ? <AuxiliaryPanel /> : <SoloChessboard />}
		</MobileGameLayoutContainer>
	);
};

export default MobileSoloGameLayout;
