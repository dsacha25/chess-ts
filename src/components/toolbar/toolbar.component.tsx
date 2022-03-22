import React from 'react';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectDashboardIndex } from '../../redux/indexes/indexes.selector';
import ToolbarChip from '../chips/toolbar-chip/toolbar-chip.component';
import ExpandingButton from '../common/buttons/expanding-button/expanding-button.component';
import {
	AestheticBar,
	ToolbarButton,
	ToolbarContainer,
} from './toolbar.styles';

import { FaHandMiddleFinger } from 'react-icons/fa';

const Toolbar = () => {
	const { setDashboardIndex } = useActions();

	const index = useSelector((state) => selectDashboardIndex(state));

	return (
		<ToolbarContainer>
			<ToolbarChip />
			<ExpandingButton icon={<FaHandMiddleFinger />}>Fuck You</ExpandingButton>
			<ToolbarButton
				onClick={() => setDashboardIndex(0)}
				color="light"
				active={index === 0}
			>
				Fuck You
			</ToolbarButton>
			<ToolbarButton
				onClick={() => setDashboardIndex(1)}
				color="light"
				active={index === 1}
			>
				Enemies
			</ToolbarButton>
			<ToolbarButton
				onClick={() => setDashboardIndex(2)}
				color="light"
				active={index === 2}
			>
				You Suck
			</ToolbarButton>
			<ToolbarButton
				onClick={() => setDashboardIndex(3)}
				color="light"
				active={index === 3}
			>
				Profile
			</ToolbarButton>
			<AestheticBar />
		</ToolbarContainer>
	);
};

export default Toolbar;
