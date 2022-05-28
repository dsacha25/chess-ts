import IndexesActionTypes from './indexes.action-types';
import { IndexesTypes } from './indexes.types';
import { produce } from 'immer';

export interface IndexesState {
	dashboardIndex: number;
	auxPanelIndex: boolean;
	mobileGameIndex: boolean;
}

const INITIAL_STATE: IndexesState = {
	dashboardIndex: 0,
	auxPanelIndex: false,
	mobileGameIndex: false,
};

const indexesReducer = produce(
	(state: IndexesState = INITIAL_STATE, action: IndexesActionTypes) => {
		switch (action.type) {
			case IndexesTypes.SET_DASHBOARD_INDEX:
				state.dashboardIndex = action.payload;
				return state;
			case IndexesTypes.SET_AUX_PANEL_INDEX:
				state.auxPanelIndex = action.payload;
				return state;
			case IndexesTypes.SET_MOBILE_GAME_INDEX:
				state.mobileGameIndex = action.payload;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default indexesReducer;
