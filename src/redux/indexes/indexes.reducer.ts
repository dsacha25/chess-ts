import IndexesActionTypes from './indexes.action-types';
import { IndexesTypes } from './indexes.types';
import { produce } from 'immer';

export interface IndexesState {
	dashboardIndex: number;
}

const INITIAL_STATE: IndexesState = {
	dashboardIndex: 0,
};

const indexesReducer = produce(
	(state: IndexesState = INITIAL_STATE, action: IndexesActionTypes) => {
		switch (action.type) {
			case IndexesTypes.SET_DASHBOARD_INDEX:
				state.dashboardIndex = action.payload;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default indexesReducer;
