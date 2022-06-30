import { User } from 'firebase/auth';
import UserActions from './user.action-types';
import UserTypes from './user.types';
import { produce } from 'immer';
import { ChessUser } from '../../utils/types/chess-user/chess-user';
import { NewCredentials } from '../../utils/types/new-credentials/new-credentials';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';

export interface UserState {
	auth: User | null;
	user: ChessUser | null;
	newCredentials: NewCredentials | null;
	enemyRequests: NotifSender[];
	online: boolean;
	loading: boolean;
	error: string;
}

export const INITIAL_STATE = {
	auth: null,
	user: null,
	newCredentials: null,
	enemyRequests: [],
	online: false,
	loading: false,
	error: '',
};

const userReducer = produce(
	(state: UserState = INITIAL_STATE, action: UserActions) => {
		switch (action.type) {
			case UserTypes.CREATE_ACCOUNT_START:
				state.newCredentials = action.payload.credentials;
				state.error = '';
				return state;
			case UserTypes.CREATE_ACCOUNT_SUCCESS:
			case UserTypes.LOG_IN_SUCCESS:
				state.auth = action.payload;
				state.error = '';
				return state;
			case UserTypes.GET_CHESS_USER_SUCCESS:
				state.user = action.payload;
				state.error = '';
				return state;
			case UserTypes.FETCH_ENEMY_REQUESTS_SUCCESS:
				state.enemyRequests = action.payload;
				state.error = '';
				return state;
			case UserTypes.ACCEPT_ENEMY_REQUEST:
			case UserTypes.REJECT_ENEMY_REQUEST:
				state.enemyRequests = state.enemyRequests.filter(
					(request) => request.uid !== action.payload
				);
				state.error = '';
				return state;
			case UserTypes.SET_USER_STATUS_SUCCESS:
				state.online = action.payload;
				return state;
			case UserTypes.LOG_OUT_SUCCESS:
				state.auth = null;
				state.user = null;
				state.newCredentials = null;
				state.error = '';
				return state;
			case UserTypes.REAUTHENTICATE_START:
				state.loading = true;
				state.error = '';
				return state;
			case UserTypes.USER_ERROR:
				state.error = action.payload;
				state.loading = false;
				return state;
			case UserTypes.REAUTHENTICATE_SUCCESS:
			case UserTypes.CLEAR_USER_ERROR:
				state.error = '';
				state.loading = false;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default userReducer;
