import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const NotificationButtonContainer = styled.div`
	display: grid;
	position: relative;

	border-radius: 25px;

	grid-column: 1 / 2;
	margin: 0;

	:focus,
	:hover {
		background-color: ${({ theme }) => theme.light};
	}
`;

export const NotifButton = styled(CustomButton)`
	display: grid;
	width: 50px;
	height: 50px;
	place-content: center;

	border-radius: 25px;

	margin: 0;
`;
