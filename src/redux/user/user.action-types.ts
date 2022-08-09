import { User } from 'firebase/auth';
import { ChessUser } from '../../utils/types/users/chess-user/chess-user';
import { Credentials } from '../../utils/types/users/credentials/credentials';
import { NewCredentials } from '../../utils/types/users/new-credentials/new-credentials';
import { NotifSender } from '../../utils/types/notifications/notif-sender/notif-sender';
import { UpdateCredentials } from '../../utils/types/users/update-credentials/update-credentials';
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

// ==== REAUTHENTICATE
export interface ReauthenticateStartActon {
	type: UserTypes.REAUTHENTICATE_START;
	payload: Credentials;
}

export interface ReauthenticateSuccessAction {
	type: UserTypes.REAUTHENTICATE_SUCCESS;
}

// GET CHESS USER
export interface OpenChessUserListenerAction {
	type: UserTypes.OPEN_CHESS_USER_LISTENER;
}

export interface GetChessUserSuccessAction {
	type: UserTypes.GET_CHESS_USER_SUCCESS;
	payload: ChessUser;
}

export interface CloseChessUserListenerAction {
	type: UserTypes.CLOSE_CHESS_USER_LISTENER;
}

// ==== LOG OUT ACTIONS
export interface LogOutStartAction {
	type: UserTypes.LOG_OUT_START;
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

// ==== ONLINE STATUS
export interface SetUserStatusStartAction {
	type: UserTypes.SET_USER_STATUS_START;
}

export interface SetUserStatusSuccessAction {
	type: UserTypes.SET_USER_STATUS_SUCCESS;
	payload: boolean;
}

export interface SetUserGamePresenceAction {
	type: UserTypes.SET_USER_GAME_PRESENCE;
	payload: { present: boolean; gameUID: string };
}

// ==== ERROR ACTION
export interface UserErrorAction {
	type: UserTypes.USER_ERROR;
	payload: string;
}

export interface ClearUserErrorAction {
	type: UserTypes.CLEAR_USER_ERROR;
}

type UserActions =
	| CheckUserSessionAction
	| LogInStartAction
	| LogInSuccessAction
	| CreateAccountStartAction
	| CreateAccountSuccessAction
	| ReauthenticateStartActon
	| ReauthenticateSuccessAction
	| OpenChessUserListenerAction
	| GetChessUserSuccessAction
	| CloseChessUserListenerAction
	| LogOutStartAction
	| LogOutSuccessAction
	| DeleteUserAccountAction
	| UpdateProfileInfoAction
	| FetchEnemyRequestsStartAction
	| FetchEnemyRequestsSuccessAction
	| AcceptEnemyRequestAction
	| RejectEnemyRequestAction
	| SetUserStatusStartAction
	| SetUserStatusSuccessAction
	| SetUserGamePresenceAction
	| UserErrorAction
	| ClearUserErrorAction;

export default UserActions;
