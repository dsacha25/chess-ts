import { SetUserDashboardIndexAction } from './indexes.action-types';
import { IndexesTypes } from './indexes.types';

export const setDashboardIndex = (
	index: number
): SetUserDashboardIndexAction => ({
	type: IndexesTypes.SET_DASHBOARD_INDEX,
	payload: index,
});
