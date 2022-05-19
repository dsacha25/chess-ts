import React from 'react';
import {
	HistoryControllerContainer,
	HistoryNavButton,
} from './history-controller.styles';

const HistoryController = () => {
	return (
		<HistoryControllerContainer>
			<HistoryNavButton>{'|<'}</HistoryNavButton>
			<HistoryNavButton>{'<'}</HistoryNavButton>
			<HistoryNavButton>{'>'}</HistoryNavButton>
			<HistoryNavButton>{'>|'}</HistoryNavButton>
		</HistoryControllerContainer>
	);
};

export default HistoryController;
