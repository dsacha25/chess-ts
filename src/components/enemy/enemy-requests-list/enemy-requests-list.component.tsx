import React from 'react';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectEnemyRequests } from '../../../redux/user/user.selector';
import Title from '../../common/title/title.styles';
import EnemyRequest from '../enemy-request/enemy-request.component';
import { EnemyRequestsListContainer } from './enemy-requests-list.styles';

const EnemyRequestsList = () => {
	const requests = useSelector((state) => selectEnemyRequests(state));

	return (
		<EnemyRequestsListContainer>
			<Title fontSize="30px">Enemy Requests</Title>
			{requests?.map((request) => (
				<EnemyRequest request={request} />
			))}
		</EnemyRequestsListContainer>
	);
};

export default EnemyRequestsList;