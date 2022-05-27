import React, { useState } from 'react';
import {
	MobileLogoutContainer,
	MobileLogoutResponses,
	MobileLogoutText,
	MobileToolbarButton,
	MobileToolbarContainer,
} from './mobile-toolbar.styles';

import { FaHandMiddleFinger } from 'react-icons/fa';
import { GiEvilLove } from 'react-icons/gi';
import { IoStatsChart } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectDashboardIndex } from '../../../redux/indexes/indexes.selector';
import NotificationButton from '../../notifications/notification-button/notification-button.component';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import Title from '../../common/title/title.styles';
import { ClickAwayListener } from '@mui/material';

const MobileToolbar = () => {
	const { setDashboardIndex, logOutStart } = useActions();
	const [open, setOpen] = useState(false);

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
			<NotificationButton mobile />
			<MobileToolbarButton onClick={() => setOpen(!open)} color="light">
				<RiLogoutCircleRLine color="black" size="30px" />
			</MobileToolbarButton>

			{open && (
				<ClickAwayListener onClickAway={() => setOpen(false)}>
					<MobileLogoutContainer>
						<Title fontSize="30px">Log Out?</Title>
						<MobileLogoutResponses>
							<MobileToolbarButton onClick={() => logOutStart()} color="warn">
								<FiCheck size="34px" />
							</MobileToolbarButton>
							<MobileToolbarButton onClick={() => setOpen(false)} color="main">
								<IoClose size="34px" />
							</MobileToolbarButton>
						</MobileLogoutResponses>
					</MobileLogoutContainer>
				</ClickAwayListener>
			)}
		</MobileToolbarContainer>
	);
};

export default MobileToolbar;