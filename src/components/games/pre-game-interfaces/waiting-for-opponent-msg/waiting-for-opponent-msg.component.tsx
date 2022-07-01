import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../utils/types/paths/paths';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';
import Spinner from '../../../common/spinner/spinner.component';
import Title from '../../../common/title/title.styles';
import { WaitingForOpponentMsgProps } from './types';
import {
	WaitingForOpponentContainer,
	WaitingPromptBackdrop,
} from './waiting-for-opponent-msg.styles';

const WaitingForOpponentMsg: FC<WaitingForOpponentMsgProps> = ({
	playersPresent,
}) => {
	const navigate = useNavigate();

	return !playersPresent ? (
		<WaitingPromptBackdrop>
			<WaitingForOpponentContainer>
				<Title fontSize="30px">Waiting for opponent...</Title>
				<Spinner size="100px" />

				<CustomButton
					onClick={() => navigate(`/${Paths.DASHBOARD}`)}
					color="main"
				>
					Return
				</CustomButton>
			</WaitingForOpponentContainer>
		</WaitingPromptBackdrop>
	) : null;
};

export default WaitingForOpponentMsg;
