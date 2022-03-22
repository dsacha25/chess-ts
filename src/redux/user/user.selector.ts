import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
	selectUser,
	(user) => user.user
);

export const selectUserUID = createSelector(
	selectCurrentUser,
	(user) => user?.uid
);

export const selectProfilePicture = createSelector(
	selectCurrentUser,
	(user) => user?.photoURL
);

export const selectAuthError = createSelector(selectUser, (user) => user.error);
