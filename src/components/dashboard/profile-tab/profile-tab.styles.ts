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

	@media screen and (max-width: 980px) {
		display: flex;
		flex-direction: column;
		max-height: 100vh;
	}
`;

export const ProfileTabContents = styled.div`
	display: flex;
	flex-direction: column;
`;

export const UpdateProfileForm = styled.form`
	display: grid;

	place-items: stretch center;

	grid-template: auto auto auto / auto 1fr;

	h2 {
		justify-self: flex-start;
		grid-column: 1 / span 2;
	}
`;

export const ProfileDataContainer = styled.div`
	display: grid;

	place-items: center;
`;

export const DeleteAccountButton = styled(CustomButton)`
	width: 250px;
	height: 60px;
	font-size: 15px;
	border-radius: 30px;
`;

export const SubmitUpdateButton = styled(CustomButton)`
	place-self: center;
	width: 400px;
	border-radius: 30px;
	grid-column: 1 / span 2;
`;

export const ReauthContainer = styled.div`
	display: grid;
	width: 100%;
	/* height: 60px; */
	place-items: center;

	position: relative;

	h2 {
		justify-self: flex-start;
	}
`;
