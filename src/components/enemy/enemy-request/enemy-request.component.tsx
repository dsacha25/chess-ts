import React, { FC } from 'react';
import {
	EnemyName,
	EnemyRequestContainer,
	RequestResponseButton,
} from './enemy-request.styles';
import { EnemyRequestProps } from './types';
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const EnemyRequest: FC<EnemyRequestProps> = ({ request }) => {
	const handleAcceptRequest = () => {
		//
	};

	const handleRejectRequest = () => {
		//
	};

	return (
		<EnemyRequestContainer>
			<EnemyName>{request.displayName}</EnemyName>
			<RequestResponseButton onClick={handleAcceptRequest} color="main">
				<FiCheck size="30px" />
			</RequestResponseButton>
			<RequestResponseButton onClick={handleRejectRequest} color="warn">
				<IoClose size="34px" />
			</RequestResponseButton>
		</EnemyRequestContainer>
	);
};

export default EnemyRequest;
