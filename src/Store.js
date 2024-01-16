import { configureStore } from '@reduxjs/toolkit';
import cart from './reducers/CartSlice'; // cartSlice를 가져옵니다.
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
  timeout: 500, 
  key: 'root',
  storage: storage,
  whitelist: ['cart', 'loading'], 
};

const rootReducer = combineReducers({
  cart: cart.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // root reducer 전달
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    preloadedState: {
        // loading: {
        //   loadingState: true,
        // },
    }
});

export const persistor = persistStore(store); // persistor도 생성해줘야 합니다.

export default store;