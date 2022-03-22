import styled from 'styled-components';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';

export const ProfileContainer = styled.div`
	display: grid;

	width: 100%;
	height: 100%;

	place-items: center;

	grid-template-rows: 1fr auto auto 1fr;

	p {
		color: white;
	}
`;

export const DeleteAccountButton = styled(CustomButton)`
	width: 250px;
	height: 60px;
	font-size: 15px;
	border-radius: 30px;
`;
