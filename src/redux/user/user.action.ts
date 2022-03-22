import { User } from 'firebase/auth';
import { Credentials } from '../../utils/types/credentials/credentials';
import { NewCredentials } from '../../utils/types/new-credentials/new-credentials';
import { UpdateProfileData } from '../../utils/types/profile-info/profile-info-types';
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
export const logOutStart = (callback?: () => void): LogOutStartAction => ({
	type: UserTypes.LOG_OUT_START,
	payload: callback,
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

/// ==== DELETE ACCOUNT
export const deleteUserAccount = (
	credential: Credentials
): DeleteUserAccountAction => ({
	type: UserTypes.DELETE_USER_ACCOUNT,
	payload: credential,
});

// ==== UPDATE PROFILE PICTURE
export const updateProfileInfo = (
	profileData: UpdateProfileData
): UpdateProfileInfoAction => ({
	type: UserTypes.UPDATE_PROFILE_INFO,
	payload: profileData,
});

/// ==== ERRORS
export const userError = (error: string): UserErrorAction => ({
	type: UserTypes.USER_ERROR,
	payload: error,
});
