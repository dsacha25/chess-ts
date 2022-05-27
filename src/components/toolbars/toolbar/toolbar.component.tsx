import React from 'react';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectDashboardIndex } from '../../../redux/indexes/indexes.selector';
import ToolbarChip from '../../chips/toolbar-chip/toolbar-chip.component';
import ExpandingButton from '../../common/buttons/expanding-button/expanding-button.component';
import { AestheticBar, ToolbarContainer } from './toolbar.styles';

import { FaHandMiddleFinger } from 'react-icons/fa';
import { GiEvilLove } from 'react-icons/gi';
import { IoStatsChart } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';

const Toolbar = () => {
	const { setDashboardIndex } = useActions();

	const index = useSelector((state) => selectDashboardIndex(state));

	return (
		<ToolbarContainer>
			<ToolbarChip />
			<ExpandingButton
				onClick={() => setDashboardIndex(0)}
				color="light"
				active={index === 0}
				icon={<FaHandMiddleFinger color="black" size="24px" />}
			>
				Fuck You
			</ExpandingButton>
			<ExpandingButton
				onClick={() => setDashboardIndex(1)}
				color="light"
				active={index === 1}
				icon={<GiEvilLove color="black" size="30px" />}
			>
				Enemies
			</ExpandingButton>
			<ExpandingButton
				onClick={() => setDashboardIndex(2)}
				color="light"
				active={index === 2}
				icon={<IoStatsChart color="black" size="24px" />}
			>
				You Suck
			</ExpandingButton>
			<ExpandingButton
				onClick={() => setDashboardIndex(3)}
				color="light"
				active={index === 3}
				icon={<CgProfile color="black" size="32px" />}
			>
				Profile
			</ExpandingButton>
			<AestheticBar />
		</ToolbarContainer>
	);
};

export default Toolbar;
