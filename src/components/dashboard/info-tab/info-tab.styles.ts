import styled from 'styled-components';

export const InfoContainer = styled.div`
	display: grid;
	width: 100%;
	height: inherit;
	max-width: 60vw;
	place-self: center;

	place-items: center;

	grid-template-rows: auto 1fr;

	@media screen and (max-width: 980px) {
		max-width: unset;
		/* width: 96vw; */
	}
`;

export const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	@media screen and (max-width: 980px) {
		width: 100vw;
		height: auto;
		padding: 10px;
	}
`;

export const Container = styled.div`
	display: grid;
	place-items: flex-end center;

	margin-left: 60px;

	@media screen and (max-width: 980px) {
		margin-left: unset;

		p {
			font-size: 14px;
			padding: 0;
			margin: 0;
			text-align: center;
		}
	}
`;

export const SocialsContainer = styled.div`
	display: flex;
	gap: 20px;
`;

export const Link = styled.a`
	font-size: 30px;
	font-style: italic;
`;

export const ContactForm = styled.form`
	display: grid;
	width: 70%;

	place-items: center;
	grid-template-rows: repeat(2, 60px) 1fr auto;
	gap: 10px;

	@media screen and (max-width: 980px) {
		width: auto;
	}
`;
