import styled from 'styled-components';
import CustomButton from '../../buttons/custom-button/custom-button.component';

export const SearchInputContainer = styled.form`
	display: grid;
	width: 100%;
	min-width: 500px;
	max-width: 50vw;
	height: 55px;
	place-items: center;

	position: relative;
`;

export const SearchButton = styled(CustomButton)`
	width: 50px;
	height: 50px;
	border-radius: 30px;
	margin: 0;
	place-content: center;

	position: absolute;
	z-index: 1;

	right: 3px;
`;