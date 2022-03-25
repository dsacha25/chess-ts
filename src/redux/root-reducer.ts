import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import gameReducer from './game/game.reducer';
import indexesReducer from './indexes/indexes.reducer';
import notificationsReducer from './notifications/notifications.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};

const rootReducer = combineReducers({
	user: userReducer,
	indexes: indexesReducer,
	notifications: notificationsReducer,
	game: gameReducer,
});

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
