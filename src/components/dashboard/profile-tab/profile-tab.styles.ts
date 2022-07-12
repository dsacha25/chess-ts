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
		width: 100vw;
		height: calc(100vh - 70px);
		overflow-y: auto;
		overflow-x: hidden;
		justify-content: flex-start;

		grid-template-rows: 1fr auto auto auto;
		place-items: unset;
	}
`;

export const ProfileTabContents = styled.div`
	display: flex;
	flex-direction: column;
`;

export const UpdateProfileForm = styled.form`
	display: grid;
	max-width: 980px;
	place-items: stretch center;

	grid-template: auto auto auto / auto 1fr;

	h2 {
		justify-self: flex-start;
		grid-column: 1 / span 2;
	}

	@media screen and (max-width: 980px) {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100%;
		grid-template: repeat(3, auto) / 1fr;
		place-items: center;

		h2 {
			font-size: 16px;
			margin: 10px;
			grid-column: unset;
			align-self: flex-start;
		}
	}
`;

export const ProfileDataContainer = styled.div`
	display: grid;

	place-items: center;

	@media screen and (max-width: 980px) {
		width: 90vw;
		height: 150px;
	}
`;

export const DeleteAccountButton = styled(CustomButton)`
	width: 400px;
	height: 60px;
	font-size: 15px;
	border-radius: 0.5rem;

	@media screen and (max-width: 980px) {
		width: 90vw;
	}
`;

export const SubmitUpdateButton = styled(CustomButton)`
	place-self: center;
	width: 400px;
	border-radius: 0.5rem;
	grid-column: 1 / span 2;

	@media screen and (max-width: 980px) {
		grid-column: unset;

		width: 90vw;
	}
`;

export const ReauthContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 980px;
	height: 100%;
	place-items: center;

	position: relative;

	h2 {
		align-self: flex-start;
		grid-column: 1 / span 2;
	}

	@media screen and (max-width: 980px) {
		margin-bottom: 100px;
		h2 {
			font-size: 16px;
			margin: 10px;
			grid-column: unset;
			align-self: flex-start;
		}
	}
`;
