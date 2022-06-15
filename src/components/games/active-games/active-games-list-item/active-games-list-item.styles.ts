import styled from 'styled-components';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';
import { ListItem } from '../../../common/lists/list-item/list-item.styles';

export const ActiveListItem = styled(ListItem)`
	@media screen and (max-width: 980px) {
		width: 100%;
	}
`;

export const JoinGameButton = styled(CustomButton)`
	width: 100%;
	height: 50px;
	border-radius: 0.5rem;
	margin: 0;
	place-content: center;
`;
