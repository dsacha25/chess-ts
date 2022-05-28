import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectIndexes = (state: RootState) => state.indexes;

export const selectDashboardIndex = createSelector(
	selectIndexes,
	(indexes) => indexes.dashboardIndex
);

export const selectAuxPanelIndex = createSelector(
	selectIndexes,
	(indexes) => indexes.auxPanelIndex
);

export const selectMobileGameIndex = createSelector(
	selectIndexes,
	(index) => index.mobileGameIndex
);
