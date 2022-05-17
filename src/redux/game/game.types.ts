export enum GameTypes {
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
	MOVE_PIECE = 'MOVE_PIECE',
	MAKE_PENDING_MOVE = 'MAKE_PENDING_MOVE',
	MAKE_CONFIRMED_MOVE_START = 'MAKE_CONFIRMED_MOVE_START',
	MAKE_CONFIRMED_MOVE_SUCCESS = 'MAKE_CONFIRMED_MOVE_SUCCESS',
	REJECT_PENDING_MOVE = 'REJECT_PENDING_MOVE',
	REJECT_GAME_CHALLENGE = 'REJECT_GAME_CHALLENGE',
	RESET_GAME_HISTORY = 'RESET_GAME_HISTORY',
	SET_ORIENTATION = 'SET_ORIENTATION',
	SET_ACTIVE_GAME = 'SET_ACTIVE_GAME',
	SET_FEN = 'SET_FEN',
	SET_GAME_TYPE = 'SET_GAME_TYPE',
	SET_GAME_HISTORY = 'SET_GAME_HISTORY',
	CLEAR_GAME_INSTANCE = 'CLEAR_GAME_INSTANCE',
	SEND_GAME_CHALLENGE = 'SEND_GAME_CHALLENGE',
	SEND_GAME_CHALLENGE_SUCCESS = 'SEND_GAME_CHALLENGE_SUCCESS',
	OPEN_ACTIVE_GAME_LISTENER = 'OPEN_ACTIVE_GAME_LISTENER',
	SEND_MESSAGE_START = 'SEND_MESSAGE_START',
	SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
	OPEN_CHAT_LISTENER_START = 'OPEN_CHAT_LISTENER_START',
	OPEN_CHAT_LISTENER_SUCCESS = 'OPEN_CHAT_LISTENER_SUCCESS',
	SET_CHAT_USERS = 'SET_CHAT_USERS',
	CHAT_FAILURE = 'CHAT_FAILURE',
}
