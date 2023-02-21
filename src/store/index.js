import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import userReducer from './reducers/userReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'token', 'is_logged_in'],
};

const rootReducer = combineReducers({
  userReducer: persistReducer(persistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
