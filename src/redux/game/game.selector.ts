import { chunk } from 'lodash';
import { createSelector } from 'reselect';
import getSide from '../../utils/helpers/side/get-side';
import { RootState } from '../root-reducer';

const selectGame = (state: RootState) => state.game;

export const selectAiLevel = createSelector(selectGame, (game) => game.aiLevel);

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
	chunk(game.history, 2)
);

export const selectFen = createSelector(selectGame, (game) => game.fen);

export const selectGameChallenges = createSelector(
	selectGame,
	(game) => game.challengeRequests
);

export const selectPendingChallenges = createSelector(
	selectGame,
	(game) => game.pendingChallenges
);

export const selectActiveGames = createSelector(
	selectGame,
	(game) => game.games
);

export const selectInactiveGames = createSelector(
	selectGame,
	(game) => game.inactiveGames
);

export const selectActiveGame = createSelector(
	selectGame,
	(game) => game.activeGame
);

export const selectGameTurn = createSelector(
	selectActiveGame,
	(activeGame) => activeGame?.turn
);

// export const selectGameTurn = createSelector(
// 	selectActiveGame,
// 	(activeGame) => activeGame?.turn
// );

export const selectActiveGameMode = createSelector(
	selectActiveGame,
	(activeGame) => activeGame?.gameMode
);

export const selectPendingMove = createSelector(
	selectGame,
	(game) => game.pendingMove
);

export const selectGameChat = createSelector(selectGame, (game) => game.chat);

export const selectGameLoadingState = createSelector(
	selectGame,
	(game) => game.loading
);

export const selectGameInviteReceiver = createSelector(
	selectGame,
	(game) => game.receiver
);

export const selectChatUsers = createSelector(
	selectGame,
	(game) => game.chatUsers
);

export const selectChatUnread = createSelector(
	selectGame,
	(game) => game.chatUnread
);

export const selectMoveIndex = createSelector(
	selectGame,
	(game) => game.moveIndex
);

export const selectIndexedMove = createSelector(
	selectGame,
	(game) => game.history[game.moveIndex]
);

export const selectIsGameOver = createSelector(
	selectActiveGame,
	(game) => game?.gameOver
);

export const selectPromotionPieceType = createSelector(
	selectGame,
	(game) => game.promotionPieceType
);
