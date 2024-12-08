import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import searchTermReducer from './slices/searchTermSlice/searchTermSlice'
import dataReducer from './slices/dataSlice/dataSlice'
import { apiSlice } from './slices/api/apiSlice'

export const store = configureStore({
  reducer: {
    data: dataReducer,
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)