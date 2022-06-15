import React from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectProfilePicture } from '../../../redux/user/user.selector';
import { ChipAvatar } from '../../chips/toolbar-chip/toolbar-chip.styles';
import ExpandingButton from '../../common/buttons/expanding-button/expanding-button.component';
import { AestheticBar, GameToolbarContainer } from './game-toolbar.styles';
import { HiHome } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../utils/types/paths/paths';

const GameToolbar = () => {
	const navigate = useNavigate();
	const photoURL = useSelector((state) => selectProfilePicture(state));
	return (
		<GameToolbarContainer>
			<ChipAvatar url={photoURL} />
			<ExpandingButton
				onClick={() => navigate(`/${Paths.DASHBOARD}`)}
				icon={<HiHome size="25px" />}
			>
				Home
			</ExpandingButton>
			<AestheticBar />
		</GameToolbarContainer>
	);
};

export default GameToolbar;
