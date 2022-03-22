import { User } from 'firebase/auth';
import UserActions from './user.action-types';
import UserTypes from './user.types';
import { produce } from 'immer';
import { ChessUser } from '../../utils/types/chess-user/chess-user';
import { NewCredentials } from '../../utils/types/new-credentials/new-credentials';

export interface UserState {
	auth: User | null;
	user: ChessUser | null;
	newCredentials: NewCredentials | null;
	error: string;
}

export const INITIAL_STATE = {
	auth: null,
	user: null,
	newCredentials: null,
	error: '',
};

const userReducer = produce(
	(state: UserState = INITIAL_STATE, action: UserActions) => {
		switch (action.type) {
			case UserTypes.CREATE_ACCOUNT_START:
				state.newCredentials = action.payload.credentials;
				return state;
			case UserTypes.CREATE_ACCOUNT_SUCCESS:
			case UserTypes.LOG_IN_SUCCESS:
				state.auth = action.payload;
				state.error = '';
				return state;
			case UserTypes.GET_CHESS_USER_SUCCESS:
				state.user = action.payload;
				return state;
			case UserTypes.USER_ERROR:
				state.error = action.payload;
				return state;
			case UserTypes.LOG_OUT_SUCCESS:
				state.error = '';
				state.user = null;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default userReducer;
