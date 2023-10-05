import {
  configureStore,
} from '@reduxjs/toolkit'

import cockailReducer from './slices/cocktailsSlice'

const store = configureStore({
  reducer: cockailReducer,
})

export default store

export type RootState = ReturnType<typeof store.getState>

// Infer the `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch
