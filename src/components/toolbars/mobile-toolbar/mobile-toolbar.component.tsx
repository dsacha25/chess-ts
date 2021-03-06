import React, { useState } from 'react';
import {
	MobileLogoutContainer,
	MobileLogoutResponses,
	MobileToolbarButton,
	MobileToolbarContainer,
} from './mobile-toolbar.styles';

import { GiEvilLove, GiTabletopPlayers } from 'react-icons/gi';
import { IoStatsChart } from 'react-icons/io5';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectDashboardIndex } from '../../../redux/indexes/indexes.selector';
import NotificationButton from '../../notifications/notification-button/notification-button.component';
import Title from '../../common/title/title.styles';
import { AvatarChip } from '../../chips/avatar-chip/avatar-chip.styles';
import { selectProfilePicture } from '../../../redux/user/user.selector';
import { BsInfoSquare } from 'react-icons/bs';

const MobileToolbar = () => {
	const { setDashboardIndex, logOutStart } = useActions();
	const [open, setOpen] = useState(false);

	const index = useSelector((state) => selectDashboardIndex(state));
	const photoURL = useSelector((state) => selectProfilePicture(state));

	return (
		<MobileToolbarContainer>
			<MobileToolbarButton
				onClick={() => setDashboardIndex(0)}
				color="light"
				active={index === 0}
			>
				<GiTabletopPlayers color="black" size="40px" />
			</MobileToolbarButton>
			<MobileToolbarButton
				onClick={() => setDashboardIndex(1)}
				color="light"
				active={index === 1}
			>
				<GiEvilLove color="black" size="40px" />
			</MobileToolbarButton>
			<MobileToolbarButton
				onClick={() => setDashboardIndex(2)}
				color="light"
				active={index === 2}
			>
				<IoStatsChart color="black" size="34px" />
			</MobileToolbarButton>
			<MobileToolbarButton
				onClick={() => setDashboardIndex(3)}
				color="light"
				active={index === 3}
			>
				<AvatarChip size="40px" url={photoURL} />
			</MobileToolbarButton>
			<MobileToolbarButton
				onClick={() => setDashboardIndex(4)}
				color="light"
				active={index === 4}
			>
				<BsInfoSquare size="40px" color="black" />
			</MobileToolbarButton>
			<NotificationButton mobile />
			<MobileToolbarButton onClick={() => setOpen(!open)} color="light">
				<RiLogoutCircleRLine color="black" size="40px" />
			</MobileToolbarButton>

			{open && (
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
			)}
		</MobileToolbarContainer>
	);
};

export default MobileToolbar;
