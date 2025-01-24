import { configureStore } from '@reduxjs/toolkit'
import socketReducer from './socketSlice'
import websocketMiddleware from './socketMiddleware'

export const store = configureStore({
  reducer: {socket: socketReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
})