import { User } from 'firebase/auth';
import UserActions from './user.action-types';
import UserTypes from './user.types';
import { produce } from 'immer';

export interface UserState {
	user: User | null;
	error: string;
}

export const INITIAL_STATE = {
	user: null,
	error: '',
};

const userReducer = produce(
	(state: UserState = INITIAL_STATE, action: UserActions) => {
		switch (action.type) {
			case UserTypes.CREATE_ACCOUNT_SUCCESS:
			case UserTypes.LOG_IN_SUCCESS:
				state.user = action.payload;
				state.error = '';
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
