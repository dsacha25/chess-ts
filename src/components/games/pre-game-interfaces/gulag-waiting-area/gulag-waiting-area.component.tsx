import React from 'react';
import Spinner from '../../../common/spinner/spinner.component';
import { TabTitle } from '../../../dashboard/challenge-tab/challenge-tab.styles';
import {
	GulagContent,
	GulagWaitingAreaContainer,
	SearchingMessageContainer,
	SearchingMsg,
} from './gulag-waiting-area.styles';

const GulagWaitingArea = () => {
	return (
		<GulagWaitingAreaContainer>
			<TabTitle>Gulag</TabTitle>
			<GulagContent>
				<SearchingMessageContainer>
					<SearchingMsg>Searching for compatible victim...</SearchingMsg>
					<Spinner size="100px" />
				</SearchingMessageContainer>
			</GulagContent>
		</GulagWaitingAreaContainer>
	);
};

export default GulagWaitingArea;
