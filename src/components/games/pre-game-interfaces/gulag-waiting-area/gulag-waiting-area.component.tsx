import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../utils/types/paths/paths';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';
import Spinner from '../../../common/spinner/spinner.component';
import { TabTitle } from '../../../dashboard/tab-styles/tab-styles..styles';
import {
	GulagContent,
	GulagWaitingAreaContainer,
	SearchingMessageContainer,
	SearchingMsg,
} from './gulag-waiting-area.styles';

const GulagWaitingArea = () => {
	const navigate = useNavigate();
	const [userFound, setUserFound] = useState(false);

	useEffect(() => {
		setUserFound(true);

		const to = setTimeout(() => {
			setUserFound(false);
		}, 5000);

		return () => {
			clearTimeout(to);
		};
	}, []);

	return (
		<GulagWaitingAreaContainer>
			<TabTitle>Gulag</TabTitle>
			<GulagContent>
				{!userFound ? (
					<SearchingMessageContainer>
						<SearchingMsg>
							Couldn't find anyone to play because you suck.
						</SearchingMsg>
						<CustomButton
							onClick={() => navigate(`/${Paths.DASHBOARD}`)}
							color="main"
						>
							Return
						</CustomButton>
					</SearchingMessageContainer>
				) : (
					<SearchingMessageContainer>
						<SearchingMsg>Searching for compatible victim...</SearchingMsg>
						<Spinner size="100px" />
					</SearchingMessageContainer>
				)}
			</GulagContent>
		</GulagWaitingAreaContainer>
	);
};

export default GulagWaitingArea;
