import { User } from 'firebase/auth';
import { ChessUser } from '../../utils/types/chess-user/chess-user';
import { Credentials } from '../../utils/types/credentials/credentials';
import { NewCredentials } from '../../utils/types/new-credentials/new-credentials';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';
import { UpdateCredentials } from '../../utils/types/update-credentials/update-credentials';
import UserTypes from './user.types';

export interface CheckUserSessionAction {
	type: UserTypes.CHECK_USER_SESSION;
}

// ==== LOG IN ACTIONS
export interface LogInStartAction {
	type: UserTypes.LOG_IN_START;
	payload: { credentials: Credentials; callback?: () => void };
}

export interface LogInSuccessAction {
	type: UserTypes.LOG_IN_SUCCESS;
	payload: User;
}

// ==== CREATE ACCOUNT ACTIONS
export interface CreateAccountStartAction {
	type: UserTypes.CREATE_ACCOUNT_START;
	payload: { credentials: NewCredentials; callback?: () => void };
}

export interface CreateAccountSuccessAction {
	type: UserTypes.CREATE_ACCOUNT_SUCCESS;
	payload: User;
}

// GET CHESS USER
export interface GetChessUserStartAction {
	type: UserTypes.GET_CHESS_USER_START;
}

export interface GetChessUserSuccessAction {
	type: UserTypes.GET_CHESS_USER_SUCCESS;
	payload: ChessUser;
}

// ==== LOG OUT ACTIONS
export interface LogOutStartAction {
	type: UserTypes.LOG_OUT_START;
	payload: (() => void) | undefined;
}
export interface LogOutSuccessAction {
	type: UserTypes.LOG_OUT_SUCCESS;
}

export interface DeleteUserAccountAction {
	type: UserTypes.DELETE_USER_ACCOUNT;
	payload: Credentials;
}

// ==== UPDATE PHOTO ACTION
export interface UpdateProfileInfoAction {
	type: UserTypes.UPDATE_PROFILE_INFO;
	payload: UpdateCredentials;
}

// ==== FETCH REQUESTS
export interface FetchEnemyRequestsStartAction {
	type: UserTypes.FETCH_ENEMY_REQUESTS_START;
}

export interface FetchEnemyRequestsSuccessAction {
	type: UserTypes.FETCH_ENEMY_REQUESTS_SUCCESS;
	payload: NotifSender[];
}

// ACCEPT/REJECT ENEMY REQUEST
export interface AcceptEnemyRequestAction {
	type: UserTypes.ACCEPT_ENEMY_REQUEST;
	payload: string;
}

export interface RejectEnemyRequestAction {
	type: UserTypes.REJECT_ENEMY_REQUEST;
	payload: string;
}

// ==== ERROR ACTION
export interface UserErrorAction {
	type: UserTypes.USER_ERROR;
	payload: string;
}

type UserActions =
	| CheckUserSessionAction
	| LogInStartAction
	| LogInSuccessAction
	| CreateAccountStartAction
	| CreateAccountSuccessAction
	| GetChessUserStartAction
	| GetChessUserSuccessAction
	| LogOutStartAction
	| LogOutSuccessAction
	| DeleteUserAccountAction
	| UpdateProfileInfoAction
	| FetchEnemyRequestsStartAction
	| FetchEnemyRequestsSuccessAction
	| AcceptEnemyRequestAction
	| RejectEnemyRequestAction
	| UserErrorAction;

export default UserActions;
