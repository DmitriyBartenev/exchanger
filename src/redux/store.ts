import {type Action, configureStore, type ThunkAction} from '@reduxjs/toolkit';

import {exchangeApi} from './features/api/exchangeApi';
import {rootReducer} from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(exchangeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = typeof store;
export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;

export default store;
