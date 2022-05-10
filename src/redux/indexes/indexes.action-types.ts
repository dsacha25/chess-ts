import { IndexesTypes } from './indexes.types';

export interface SetUserDashboardIndexAction {
	type: IndexesTypes.SET_DASHBOARD_INDEX;
	payload: number;
}

export interface SetAuxiliaryPanelIndexAction {
	type: IndexesTypes.SET_AUX_PANEL_INDEX;
	payload: boolean;
}

type IndexesActionTypes =
	| SetUserDashboardIndexAction
	| SetAuxiliaryPanelIndexAction;

export default IndexesActionTypes;
