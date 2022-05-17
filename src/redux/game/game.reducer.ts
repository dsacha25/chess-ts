import GameType from '../../utils/types/game-type/game-type';
import Orientation from '../../utils/types/orientation/orientation';
import GameActions from './game.action-types';
import { GameTypes } from './game.types';
import { produce } from 'immer';
import { NotifSender } from '../../utils/types/notif-sender/notif-sender';
import { ChessGameType } from '../../utils/types/chess-game-type/chess-game-type';
import { PendingRequest } from '../../utils/types/pending-request/pending-request';
import { ChessMove } from '../../utils/types/chess-move/chess-move';
import { ChatMessage } from '../../utils/types/chat-message/chat-message';
import { HistoryMove } from '../../utils/types/history-move/history-move';
import { ChatUsers } from '../../utils/types/chat-users/chat-users';

export interface GameState {
	fen: string;
	previousFen: string;
	history: HistoryMove[];
	chat: ChatMessage[];
	chatUsers: ChatUsers;
	chatUnread: boolean;
	gameType: GameType;
	orientation: Orientation;
	challengeRequests: NotifSender[];
	pendingChallenges: PendingRequest[];
	games: ChessGameType[];
	activeGame: ChessGameType | null;
	inactiveGames: ChessGameType[];
	pendingMove: ChessMove | null;
	receiver: string;
	loading: boolean;
	error: string;
}

const DEFAULT_POSITION =
	'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const INITIAL_STATE: GameState = {
	fen: DEFAULT_POSITION,
	previousFen: DEFAULT_POSITION,
	history: [],
	chat: [],
	chatUsers: {},
	chatUnread: false,
	gameType: 'solo',
	orientation: 'white',
	challengeRequests: [],
	pendingChallenges: [],
	games: [],
	activeGame: null,
	inactiveGames: [],
	pendingMove: null,
	receiver: '',
	loading: false,
	error: '',
};

const gameReducer = produce(
	(state: GameState = INITIAL_STATE, action: GameActions) => {
		switch (action.type) {
			case GameTypes.CLEAR_GAME_INSTANCE:
				state.activeGame = null;
				state.pendingMove = null;
				state.error = '';
				return state;
			case GameTypes.MOVE_PIECE:
				state.history.push(action.payload);
				state.error = '';
				return state;
			case GameTypes.SET_GAME_HISTORY:
				state.history = action.payload;
				state.error = '';
				return state;
			case GameTypes.RESET_GAME_HISTORY:
				state.history = [];
				state.error = '';
				return state;
			case GameTypes.SET_GAME_TYPE:
				state.gameType = action.payload;
				state.error = '';
				return state;
			case GameTypes.SET_ORIENTATION:
				state.orientation = action.payload;
				state.error = '';
				return state;
			case GameTypes.SET_FEN:
				state.previousFen = state.fen;
				state.fen = action.payload;
				state.error = '';
				return state;
			case GameTypes.SEND_GAME_CHALLENGE:
				state.receiver = action.payload;
				state.loading = true;
				return state;
			case GameTypes.ACCEPT_GAME_CHALLENGE_START:
				state.loading = true;
				state.receiver = action.payload.uid;
				state.error = '';
				return state;
			case GameTypes.GAME_CHALLENGE_RESPONSE_SUCCESS:
				state.loading = false;
				state.receiver = '';
				state.challengeRequests = state.challengeRequests.filter(
					(sender) => sender.uid !== action.payload
				);
				return state;
			case GameTypes.REJECT_GAME_CHALLENGE:
				state.loading = true;
				state.receiver = action.payload;

				state.error = '';
				return state;
			case GameTypes.FETCH_GAME_CHALLENGES_SUCCESS:
				state.challengeRequests = action.payload;
				state.error = '';
				return state;
			case GameTypes.FETCH_PENDING_CHALLENGES_START:
				state.receiver = '';
				state.loading = false;
				return state;
			case GameTypes.FETCH_PENDING_CHALLENGES_SUCCESS:
				state.pendingChallenges = action.payload;
				state.error = '';
				return state;
			case GameTypes.FETCH_ACTIVE_GAMES_SUCCESS:
				state.games = action.payload;
				state.error = '';
				return state;
			case GameTypes.FETCH_INACTIVE_GAMES_SUCCESS:
				state.inactiveGames = action.payload;
				return state;
			case GameTypes.SET_ACTIVE_GAME:
				state.activeGame = action.payload;
				state.error = '';
				return state;
			case GameTypes.CLEAR_ACTIVE_GAME:
				state.fen = DEFAULT_POSITION;
				state.previousFen = DEFAULT_POSITION;
				state.activeGame = null;
				state.pendingMove = null;
				state.history = [];
				state.orientation = 'white';
				state.error = '';
				return state;
			case GameTypes.MAKE_PENDING_MOVE:
				state.pendingMove = action.payload;
				state.previousFen = action.payload.previousFen;
				return state;
			case GameTypes.REJECT_PENDING_MOVE:
				state.fen = state.previousFen;
				state.pendingMove = null;
				state.error = '';
				return state;
			case GameTypes.MAKE_CONFIRMED_MOVE_START:
				state.loading = true;
				return state;
			case GameTypes.OPEN_ACTIVE_GAME_LISTENER:
			case GameTypes.MAKE_CONFIRMED_MOVE_SUCCESS:
				state.pendingMove = null;
				state.receiver = '';
				state.loading = false;
				state.error = '';
				return state;
			case GameTypes.OPEN_CHAT_LISTENER_SUCCESS:
				state.chat = action.payload;
				return state;
			case GameTypes.SET_CHAT_USERS:
				state.chatUsers = action.payload;
				return state;
			case GameTypes.SET_CHAT_UNREAD_STATE:
				state.chatUnread = action.payload;
				return state;
			case GameTypes.GAME_ERROR:
				state.error = action.payload;
				state.receiver = '';
				state.loading = false;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default gameReducer;
