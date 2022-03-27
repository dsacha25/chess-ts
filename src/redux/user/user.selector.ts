import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectUser = (state: RootState) => state.user;

export const selectUserAuth = createSelector(selectUser, (user) => user.auth);

export const selectChessUser = createSelector(selectUser, (user) => user.user);

export const selectNewCredentails = createSelector(
	selectUser,
	(user) => user.newCredentials
);

export const selectUserUID = createSelector(
	selectUserAuth,
	(auth) => auth?.uid
);

export const selectProfilePicture = createSelector(
	selectChessUser,
	(user) => user?.photoURL
);

export const selectEnemyRequests = createSelector(
	selectUser,
	(user) => user.enemyRequests
);

export const selectAuthError = createSelector(selectUser, (user) => user.error);
