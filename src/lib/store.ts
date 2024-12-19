import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from '@hooks/redux/users'
import { sharesApi } from '@hooks/redux/shares'
import { tasksApi } from '@hooks/redux/tasks'
import {notificationApi} from '@hooks/redux/notifications'

export const store = configureStore({
  reducer: {
    
    // Add the generated reducer as a specific top-level slice
    [usersApi.reducerPath]: usersApi.reducer,
    [sharesApi.reducerPath]:sharesApi.reducer,
    [tasksApi.reducerPath]:tasksApi.reducer,
    [notificationApi.reducerPath]:notificationApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      sharesApi.middleware,
      tasksApi.middleware,
      notificationApi.middleware
    ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
