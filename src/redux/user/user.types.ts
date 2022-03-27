enum UserTypes {
	CHECK_USER_SESSION = 'CHECK_USER_SESSION',
	LOG_OUT_START = 'LOG_OUT_START',
	LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS',
	LOG_IN_START = 'LOG_IN_START',
	LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
	CREATE_ACCOUNT_START = 'CREATE_ACCOUNT_START',
	CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS',
	UPDATE_DISPLAY_NAME = 'UPDATE_DISPLAY_NAME',
	UPDATE_PROFILE_INFO = 'UPDATE_PROFILE_INFO',
	UPDATE_EMAIL = 'UPDATE_EMAIL',
	UPDATE_PASSWORD = 'UPDATE_PASSWORD',
	GET_CHESS_USER_START = 'GET_CHESS_USER_START',
	GET_CHESS_USER_SUCCESS = 'GET_CHESS_USER_SUCCESS',
	DELETE_USER_ACCOUNT = 'DELETE_USER_ACCOUNT',
	FETCH_ENEMY_REQUESTS_START = 'FETCH_ENEMY_REQUESTS_START',
	FETCH_ENEMY_REQUESTS_SUCCESS = 'FETCH_ENEMY_REQUESTS_SUCCESS',
	ACCEPT_ENEMY_REQUEST = 'ACCEPT_ENEMY_REQUEST',
	REJECT_ENEMY_REQUEST = 'REJECT_ENEMY_REQUEST',
	USER_ERROR = 'USER_ERROR',
}

export default UserTypes;
