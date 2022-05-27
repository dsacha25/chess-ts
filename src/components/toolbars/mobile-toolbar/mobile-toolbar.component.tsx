import React from 'react';
import {
	MobileToolbarButton,
	MobileToolbarContainer,
} from './mobile-toolbar.styles';

import { FaHandMiddleFinger } from 'react-icons/fa';
import { GiEvilLove } from 'react-icons/gi';
import { IoStatsChart } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import IconButton from '../../common/buttons/icon-button/icon-button.component';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectDashboardIndex } from '../../../redux/indexes/indexes.selector';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

const MobileToolbar = () => {
	const { setDashboardIndex } = useActions();

	const index = useSelector((state) => selectDashboardIndex(state));

	return (
		<MobileToolbarContainer>
			<MobileToolbarButton
				onClick={() => setDashboardIndex(0)}
				color="light"
				active={index === 0}
			>
				<FaHandMiddleFinger color="black" size="24px" />
			</MobileToolbarButton>
			<MobileToolbarButton
				onClick={() => setDashboardIndex(1)}
				color="light"
				active={index === 1}
			>
				<GiEvilLove color="black" size="30px" />
			</MobileToolbarButton>
			<MobileToolbarButton
				onClick={() => setDashboardIndex(2)}
				color="light"
				active={index === 2}
			>
				<IoStatsChart color="black" size="24px" />
			</MobileToolbarButton>
			<MobileToolbarButton
				onClick={() => setDashboardIndex(3)}
				color="light"
				active={index === 3}
			>
				<CgProfile color="black" size="32px" />
			</MobileToolbarButton>
		</MobileToolbarContainer>
	);
};

export default MobileToolbar;
