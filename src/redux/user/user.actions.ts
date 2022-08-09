import { User } from 'firebase/auth';
import { ChessUser } from '../../utils/types/users/chess-user/chess-user';
import { Credentials } from '../../utils/types/users/credentials/credentials';
import { NewCredentials } from '../../utils/types/users/new-credentials/new-credentials';
import { NotifSender } from '../../utils/types/notifications/notif-sender/notif-sender';
import { UpdateCredentials } from '../../utils/types/users/update-credentials/update-credentials';
import {
	LogInStartAction,
	LogInSuccessAction,
	CreateAccountStartAction,
	CreateAccountSuccessAction,
	LogOutStartAction,
	DeleteUserAccountAction,
	LogOutSuccessAction,
	UserErrorAction,
	CheckUserSessionAction,
	UpdateProfileInfoAction,
	GetChessUserStartAction,
	GetChessUserSuccessAction,
	FetchEnemyRequestsStartAction,
	FetchEnemyRequestsSuccessAction,
	AcceptEnemyRequestAction,
	RejectEnemyRequestAction,
	ReauthenticateStartActon,
	ReauthenticateSuccessAction,
	ClearUserErrorAction,
	SetUserStatusStartAction,
	SetUserStatusSuccessAction,
	SetUserGamePresenceAction,
} from './user.action-types';
import UserTypes from './user.types';

// ==== AUTHENTICATION ==== //
export const checkUserSession = (): CheckUserSessionAction => ({
	type: UserTypes.CHECK_USER_SESSION,
});

/// ==== LOG IN
export const logInStart = (
	credentials: Credentials,
	callback?: () => void
): LogInStartAction => ({
	type: UserTypes.LOG_IN_START,
	payload: { credentials, callback },
});

export const logInSuccess = (user: User): LogInSuccessAction => ({
	type: UserTypes.LOG_IN_SUCCESS,
	payload: user,
});

/// ==== LOG OUT
export const logOutStart = (): LogOutStartAction => ({
	type: UserTypes.LOG_OUT_START,
});

export const logOutSuccess = (): LogOutSuccessAction => ({
	type: UserTypes.LOG_OUT_SUCCESS,
});

/// ==== CREATE ACCOUNT
export const createAccountStart = (
	credentials: NewCredentials,
	callback?: () => void
): CreateAccountStartAction => ({
	type: UserTypes.CREATE_ACCOUNT_START,
	payload: { credentials, callback },
});

export const createAccountSuccess = (
	user: User
): CreateAccountSuccessAction => ({
	type: UserTypes.CREATE_ACCOUNT_SUCCESS,
	payload: user,
});

// ==== REAUTHENTICATE
export const reauthenticateStart = (
	credentials: Credentials
): ReauthenticateStartActon => ({
	type: UserTypes.REAUTHENTICATE_START,
	payload: credentials,
});

export const reauthenticateSuccess = (): ReauthenticateSuccessAction => ({
	type: UserTypes.REAUTHENTICATE_SUCCESS,
});

/// ==== GET CHESS USER
export const getChessUserStart = (): GetChessUserStartAction => ({
	type: UserTypes.GET_CHESS_USER_START,
});

export const getChessUserSuccess = (
	chessUser: ChessUser
): GetChessUserSuccessAction => ({
	type: UserTypes.GET_CHESS_USER_SUCCESS,
	payload: chessUser,
});

/// ==== DELETE ACCOUNT
export const deleteUserAccount = (
	credential: Credentials
): DeleteUserAccountAction => ({
	type: UserTypes.DELETE_USER_ACCOUNT,
	payload: credential,
});

// ==== UPDATE PROFILE PICTURE
export const updateProfileInfo = (
	profileData: UpdateCredentials
): UpdateProfileInfoAction => ({
	type: UserTypes.UPDATE_PROFILE_INFO,
	payload: profileData,
});

// ==== FETCH ENEMY REQUESTS
export const fetchEnemyRequestsStart = (): FetchEnemyRequestsStartAction => ({
	type: UserTypes.FETCH_ENEMY_REQUESTS_START,
});

export const fetchEnemyRequestsSuccess = (
	requests: NotifSender[]
): FetchEnemyRequestsSuccessAction => ({
	type: UserTypes.FETCH_ENEMY_REQUESTS_SUCCESS,
	payload: requests,
});

// ==== ACCEPT/REJECT ENEMY REQUEST
export const acceptEnemyRequest = (
	enemyUID: string
): AcceptEnemyRequestAction => ({
	type: UserTypes.ACCEPT_ENEMY_REQUEST,
	payload: enemyUID,
});

export const rejectEnemyRequest = (
	enemyUID: string
): RejectEnemyRequestAction => ({
	type: UserTypes.REJECT_ENEMY_REQUEST,
	payload: enemyUID,
});

// ==== ONLINE STATUS
export const setUserStatusStart = (): SetUserStatusStartAction => ({
	type: UserTypes.SET_USER_STATUS_START,
});

export const setUserStatusSuccess = (
	online: boolean
): SetUserStatusSuccessAction => ({
	type: UserTypes.SET_USER_STATUS_SUCCESS,
	payload: online,
});

export const setUserGamePresence = (
	present: boolean,
	gameUID: string
): SetUserGamePresenceAction => ({
	type: UserTypes.SET_USER_GAME_PRESENCE,
	payload: { present, gameUID },
});

/// ==== ERRORS
export const userError = (error: string): UserErrorAction => ({
	type: UserTypes.USER_ERROR,
	payload: error,
});

export const clearUserError = (): ClearUserErrorAction => ({
	type: UserTypes.CLEAR_USER_ERROR,
});
