import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './features/toast/toastSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
  },
})