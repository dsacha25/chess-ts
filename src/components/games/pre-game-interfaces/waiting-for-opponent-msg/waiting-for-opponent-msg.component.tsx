import React, { FC } from 'react';
import Spinner from '../../../common/spinner/spinner.component';
import Title from '../../../common/title/title.styles';
import { WaitingForOpponentMsgProps } from './types';
import { WaitingForOpponentContainer } from './waiting-for-opponent-msg.styles';

const WaitingForOpponentMsg: FC<WaitingForOpponentMsgProps> = ({
	playersPresent,
}) =>
	!playersPresent ? (
		<WaitingForOpponentContainer>
			<Title fontSize="30px">Waiting for opponent...</Title>
			<Spinner size="80px" />
		</WaitingForOpponentContainer>
	) : null;

export default WaitingForOpponentMsg;
