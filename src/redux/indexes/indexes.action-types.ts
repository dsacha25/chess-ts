import { IndexesTypes } from './indexes.types';

export interface SetUserDashboardIndexAction {
	type: IndexesTypes.SET_DASHBOARD_INDEX;
	payload: number;
}

export interface SetAuxiliaryPanelIndexAction {
	type: IndexesTypes.SET_AUX_PANEL_INDEX;
	payload: boolean;
}

export interface SetMobileGameIndexAction {
	type: IndexesTypes.SET_MOBILE_GAME_INDEX;
	payload: boolean;
}

type IndexesActionTypes =
	| SetUserDashboardIndexAction
	| SetAuxiliaryPanelIndexAction
	| SetMobileGameIndexAction;

export default IndexesActionTypes;
