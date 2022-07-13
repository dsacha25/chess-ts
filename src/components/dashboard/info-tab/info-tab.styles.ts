import styled from 'styled-components';

export const InfoContainer = styled.div`
	display: grid;
	width: 100%;
	height: inherit;

	place-items: center;

	grid-template-rows: auto 1fr;
`;

export const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	/* grid-template-rows: auto 1fr 1fr 1fr; */
`;

export const SocialsContainer = styled.div`
	display: flex;
	width: 100%;
`;

export const Link = styled.a`
	font-size: 30px;
`;

export const ContactForm = styled.form`
	display: grid;
	width: 100%;

	place-items: center;
	grid-template-rows: repeat(2, 60px) 1fr auto;
	gap: 10px;
`;
