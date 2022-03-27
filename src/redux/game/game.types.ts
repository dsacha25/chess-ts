export enum GameTypes {
	SET_ORIENTATION = 'SET_ORIENTATION',
	MOVE_PIECE = 'MOVE_PIECE',
	RESET_GAME_HISTORY = 'RESET_GAME_HISTORY',
	SET_GAME_TYPE = 'SET_GAME_TYPE',
	SET_FEN = 'SET_FEN',
	SEND_GAME_CHALLENGE = 'SEND_GAME_CHALLENGE',
	ACCEPT_GAME_CHALLENGE = 'ACCEPT_GAME_CHALLENGE',
	REJECT_GAME_CHALLENGE = 'REJECT_GAME_CHALLENGE',
	GAME_ERROR = 'GAME_ERROR',
	FETCH_GAME_CHALLENGES_START = 'FETCH_GAME_CHALLENGES_START',
	FETCH_GAME_CHALLENGES_SUCCESS = 'FETCH_GAME_CHALLENGES_SUCCESS',
}
