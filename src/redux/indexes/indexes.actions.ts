import {
	SetAuxiliaryPanelIndexAction,
	SetUserDashboardIndexAction,
} from './indexes.action-types';
import { IndexesTypes } from './indexes.types';

export const setDashboardIndex = (
	index: number
): SetUserDashboardIndexAction => ({
	type: IndexesTypes.SET_DASHBOARD_INDEX,
	payload: index,
});

export const setAuxPanelIndex = (
	index: boolean
): SetAuxiliaryPanelIndexAction => ({
	type: IndexesTypes.SET_AUX_PANEL_INDEX,
	payload: index,
});
