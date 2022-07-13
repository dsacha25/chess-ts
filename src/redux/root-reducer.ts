import { combineReducers } from 'redux';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import enemyReducer from './enemies/enemies.reducer';
import gameReducer from './game/game.reducer';
import indexesReducer from './indexes/indexes.reducer';
import notificationsReducer from './notifications/notifications.reducer';
import userReducer from './user/user.reducer';

type ExtendedPersistConfig = PersistConfig<RootState> & {
	whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'enemy', 'game'],
};

const rootReducer = combineReducers({
	user: userReducer,
	indexes: indexesReducer,
	notifications: notificationsReducer,
	game: gameReducer,
	enemy: enemyReducer,
});

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
