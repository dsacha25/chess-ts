import { Move } from 'chess.js';
import { chunk, create, map } from 'lodash';
import { createSelector } from 'reselect';
import getSide from '../../utils/helpers/side/get-side';
import { RootState } from '../root-reducer';

const selectGame = (state: RootState) => state.game;

export const selectGameHistory = createSelector(
	selectGame,
	(game) => game.history
);

export const selectGameType = createSelector(
	selectGame,
	(game) => game.gameType
);

export const selectOrientation = createSelector(
	selectGame,
	(game) => game.orientation
);

export const selectSide = createSelector(selectOrientation, (orientation) =>
	getSide(orientation)
);

export const selectTurns = createSelector(selectGame, (game) =>
	chunk(
		map(game.history, (move: Move) => move.san),
		2
	)
);

export const selectFen = createSelector(selectGame, (game) => game.fen);

export const selectGameChallenges = createSelector(
	selectGame,
	(game) => game.challengeRequests
);

export const selectActiveGames = createSelector(
	selectGame,
	(game) => game.games
);
