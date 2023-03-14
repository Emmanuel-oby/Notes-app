import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './features/toast/toastSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
  },
})