import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { usersApi } from '@hooks/redux/users';
import { sharesApi } from '@hooks/redux/shares';
import { tasksApi } from '@hooks/redux/tasks';
import { notificationApi } from '@hooks/redux/notifications';
import { cardsApi } from '@hooks/redux/cards';
import { referralsApi } from '@hooks/redux/referrals';
import { tgUserPhotoApi } from '@hooks/redux/tg_photo';
import { ranksApi } from '@hooks/redux/ranks';
import { wealthClassApi } from '@hooks/redux/wealthclass';
import { storiesApi } from '@hooks/redux/stories';
import { channelApi } from '@hooks/redux/channels';
import { tasksSlice } from '@/hooks/redux/slices/tasksSlice';
import { userSlice } from '@/hooks/redux/slices/usersSlice';



// Combine reducers
const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [sharesApi.reducerPath]: sharesApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
  [referralsApi.reducerPath]: referralsApi.reducer,
  [tgUserPhotoApi.reducerPath]: tgUserPhotoApi.reducer,
  [ranksApi.reducerPath]: ranksApi.reducer,
  [wealthClassApi.reducerPath]: wealthClassApi.reducer,
  [storiesApi.reducerPath]: storiesApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
  tasks: tasksSlice.reducer, // Add tasks slice
  userData: userSlice.reducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tasks', "userData"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }).concat(
      usersApi.middleware,
      sharesApi.middleware,
      tasksApi.middleware,
      notificationApi.middleware,
      cardsApi.middleware,
      referralsApi.middleware,
      tgUserPhotoApi.middleware,
      ranksApi.middleware,
      wealthClassApi.middleware,
      storiesApi.middleware,
      channelApi.middleware
    ),
});

// Persist store
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Setup listeners
setupListeners(store.dispatch);
