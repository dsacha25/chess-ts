import { IndexesTypes } from './indexes.types';

export interface SetUserDashboardIndexAction {
	type: IndexesTypes.SET_DASHBOARD_INDEX;
	payload: number;
}

type IndexesActionTypes = SetUserDashboardIndexAction;

export default IndexesActionTypes;
