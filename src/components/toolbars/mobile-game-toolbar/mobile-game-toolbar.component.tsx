import React, { useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import Title from '../../common/title/title.styles';
import {
	MobileLogoutContainer,
	MobileLogoutResponses,
	MobileToolbarButton,
} from '../mobile-toolbar/mobile-toolbar.styles';
import { MobileGameToolbarContainer } from './mobile-game-toolbar.styles';

import { HiHome } from 'react-icons/hi';
import { MdInfo } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { FaChessBoard } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';

import { useNavigate } from 'react-router-dom';
import Paths from '../../../utils/types/paths/paths';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectMobileGameIndex } from '../../../redux/indexes/indexes.selector';
import { AvatarChip } from '../../chips/avatar-chip/avatar-chip.styles';
import { selectProfilePicture } from '../../../redux/user/user.selector';

const MobileGameToolbar = () => {
	const navigate = useNavigate();
	const { logOutStart, setMobileGameIndex } = useActions();
	const index = useSelector((state) => selectMobileGameIndex(state));
	const photoURL = useSelector((state) => selectProfilePicture(state));

	const [open, setOpen] = useState(false);
	const [clickedAway, setClickedAway] = useState(false);

	const toggleLogout = (source: string) => {
		if (source === 'clickAway') {
			setClickedAway(true);
		}

		if (!open && clickedAway) {
			setOpen(true);
			setClickedAway(false);
		}
		if (open && clickedAway) {
			setOpen(false);
			setClickedAway(false);
		}

		if (!clickedAway && !open) {
			setOpen(true);
		}
	};

	return (
		<MobileGameToolbarContainer>
			<MobileToolbarButton
				color="light"
				onClick={() => navigate(`/${Paths.DASHBOARD}`)}
			>
				<HiHome color="black" size="36px" />
			</MobileToolbarButton>
			<MobileToolbarButton
				color="light"
				onClick={() => setMobileGameIndex(!index)}
			>
				{index ? (
					<FaChessBoard color="black" size="36px" />
				) : (
					<MdInfo color="black" size="36px" />
				)}
			</MobileToolbarButton>

			<MobileToolbarButton onClick={() => toggleLogout('button')} color="light">
				<AvatarChip size="36px" url={photoURL} />
			</MobileToolbarButton>

			{open && (
				<ClickAwayListener onClickAway={() => toggleLogout('clickAway')}>
					<MobileLogoutContainer>
						<Title fontSize="30px">Log Out?</Title>
						<MobileLogoutResponses>
							<MobileToolbarButton onClick={() => logOutStart()} color="warn">
								<RiLogoutCircleRLine size="30px" />
							</MobileToolbarButton>
							<MobileToolbarButton onClick={() => setOpen(false)} color="main">
								<IoClose size="34px" />
							</MobileToolbarButton>
						</MobileLogoutResponses>
					</MobileLogoutContainer>
				</ClickAwayListener>
			)}
		</MobileGameToolbarContainer>
	);
};

export default MobileGameToolbar;
