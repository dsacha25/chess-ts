export enum GameTypes {
	SET_AI_LEVEL = 'SET_AI_LEVEL',
	ACCEPT_GAME_CHALLENGE_START = 'ACCEPT_GAME_CHALLENGE_START',
	GAME_CHALLENGE_RESPONSE_SUCCESS = 'GAME_CHALLENGE_RESPONSE_SUCCESS',
	CLEAR_ACTIVE_GAME = 'CLEAR_ACTIVE_GAME',
	GAME_ERROR = 'GAME_ERROR',
	FETCH_GAME_CHALLENGES_START = 'FETCH_GAME_CHALLENGES_START',
	FETCH_GAME_CHALLENGES_SUCCESS = 'FETCH_GAME_CHALLENGES_SUCCESS',
	FETCH_PENDING_CHALLENGES_START = 'FETCH_PENDING_CHALLENGES_START',
	FETCH_PENDING_CHALLENGES_SUCCESS = 'FETCH_PENDING_CHALLENGES_SUCCESS',
	FETCH_ACTIVE_GAMES_START = 'FETCH_ACTIVE_GAMES_START',
	FETCH_ACTIVE_GAMES_SUCCESS = 'FETCH_ACTIVE_GAMES_SUCCESS',
	FETCH_INACTIVE_GAMES_START = 'FETCH_INACTIVE_GAMES_START',
	FETCH_INACTIVE_GAMES_SUCCESS = 'FETCH_INACTIVE_GAMES_SUCCESS',
	FETCH_INACTIVE_GAME_SUMMARIES_SUCCESS = 'FETCH_INACTIVE_GAME_SUMMARIES_SUCCESS',
	FETCH_GAME_BY_ID = 'FETCH_GAME_BY_ID',
	MOVE_PIECE = 'MOVE_PIECE',
	MAKE_PENDING_MOVE = 'MAKE_PENDING_MOVE',
	MAKE_CONFIRMED_MOVE_START = 'MAKE_CONFIRMED_MOVE_START',
	MAKE_CONFIRMED_MOVE_SUCCESS = 'MAKE_CONFIRMED_MOVE_SUCCESS',
	SET_PROMOTION_PIECE_TYPE = 'SET_PROMOTION_PIECE_TYPE',
	CLEAR_PROMOTION_PIECE_TYPE = 'CLEAR_PROMOTION_PIECE_TYPE',
	RESIGN_GAME = 'RESIGN_GAME',
	AUTO_RESIGN_OPPONENT = 'AUTO_RESIGN_OPPONENT',
	REQUEST_DRAW = 'REQUEST_DRAW',
	ACCEPT_DRAW_REQUEST = 'ACCEPT_DRAW_REQUEST',
	REJECT_DRAW_REQUEST = 'REJECT_DRAW_REQUEST',
	REJECT_PENDING_MOVE = 'REJECT_PENDING_MOVE',
	REJECT_GAME_CHALLENGE = 'REJECT_GAME_CHALLENGE',
	RESET_GAME_HISTORY = 'RESET_GAME_HISTORY',
	SET_ORIENTATION = 'SET_ORIENTATION',
	SET_ACTIVE_GAME = 'SET_ACTIVE_GAME',
	SET_CURRENT_GAME = 'SET_CURRENT_GAME',
	SET_ACTIVE_GAME_AI = 'SET_ACTIVE_GAME_AI',
	SET_INACTIVE_GAME_BY_ID_START = 'SET_INACTIVE_GAME_BY_ID_START',
	SET_ACTIVE_GAME_BY_ID_SUCCESS = 'SET_ACTIVE_GAME_BY_ID_SUCCESS',
	SET_FEN = 'SET_FEN',
	SET_GAME_TYPE = 'SET_GAME_TYPE',
	SET_GAME_HISTORY = 'SET_GAME_HISTORY',
	GET_DEFAULT_POSITION = 'GET_DEFAULT_POSITION',
	GET_PREVIOUS_MOVE = 'GET_PREVIOUS_MOVE',
	GET_NEXT_MOVE = 'GET_NEXT_MOVE',
	GET_LATEST_MOVE = 'GET_LATEST_MOVE',
	SET_MOVE_FROM_INDEX = 'SET_MOVE_FROM_INDEX',
	SET_ACTIVE_GAME_TIME_WHITE = 'SET_ACTIVE_GAME_TIME_WHITE',
	SET_ACTIVE_GAME_TIME = 'SET_ACTIVE_GAME_TIME',
	CLEAR_GAME_INSTANCE = 'CLEAR_GAME_INSTANCE',
	SEND_GAME_CHALLENGE = 'SEND_GAME_CHALLENGE',
	SEND_GAME_CHALLENGE_SUCCESS = 'SEND_GAME_CHALLENGE_SUCCESS',
	OPEN_ACTIVE_GAME_LISTENER = 'OPEN_ACTIVE_GAME_LISTENER',
	CLOSE_ACTIVE_GAME_LISTENER = 'CLOSE_ACTIVE_GAME_LISTENER',
	SEND_MESSAGE_START = 'SEND_MESSAGE_START',
	SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
	OPEN_CHAT_LISTENER_START = 'OPEN_CHAT_LISTENER_START',
	OPEN_CHAT_LISTENER_SUCCESS = 'OPEN_CHAT_LISTENER_SUCCESS',
	SET_CHAT_USERS = 'SET_CHAT_USERS',
	SET_CHAT_UNREAD_STATE = 'SET_CHAT_UNREAD_STATE',
	READ_CHAT_MESSAGE = 'READ_CHAT_MESSAGE',
	CHAT_FAILURE = 'CHAT_FAILURE',
}
