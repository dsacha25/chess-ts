import React from 'react';
import Spinner from '../../../common/spinner/spinner.component';
import { TabTitle } from '../../../dashboard/challenge-tab/challenge-tab.styles';
import {
	GulagWaitingAreaContainer,
	SearchingMessageContainer,
	SearchingMsg,
} from './gulag-waiting-area.styles';

const GulagWaitingArea = () => {
	return (
		<GulagWaitingAreaContainer>
			<TabTitle>Gulag</TabTitle>
			<SearchingMessageContainer>
				<SearchingMsg>Searching for compatible victim...</SearchingMsg>
				<Spinner />
			</SearchingMessageContainer>
		</GulagWaitingAreaContainer>
	);
};

export default GulagWaitingArea;
