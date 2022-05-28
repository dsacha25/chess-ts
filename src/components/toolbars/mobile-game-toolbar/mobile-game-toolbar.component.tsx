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
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { FaChessBoard } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';

import { useNavigate } from 'react-router-dom';
import Paths from '../../../utils/types/paths/paths';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectMobileGameIndex } from '../../../redux/indexes/indexes.selector';

const MobileGameToolbar = () => {
	const navigate = useNavigate();
	const { logOutStart, setMobileGameIndex } = useActions();
	const index = useSelector((state) => selectMobileGameIndex(state));

	const [open, setOpen] = useState(false);

	return (
		<MobileGameToolbarContainer>
			<MobileToolbarButton
				color="light"
				onClick={() => navigate(`/${Paths.DASHBOARD}`)}
			>
				<HiHome color="black" size="25px" />
			</MobileToolbarButton>
			<MobileToolbarButton
				color="light"
				onClick={() => setMobileGameIndex(!index)}
			>
				{index ? (
					<FaChessBoard color="black" size="25px" />
				) : (
					<MdInfo color="black" size="25px" />
				)}
			</MobileToolbarButton>

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
		</MobileGameToolbarContainer>
	);
};

export default MobileGameToolbar;
