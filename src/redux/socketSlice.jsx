import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connected: false,
    messages: [],
    error: null,
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        websocketConnected: (state) => {
            state.connected = true;
        },     
        websocketDisconnected: (state) => {
            state.connected = false;
        },
        websocketMessageReceived: (state, action) => {
            state.messages.push(action.payload);
        },
        websocketError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const {    
    websocketConnected,
    websocketDisconnected,
    websocketMessageReceived,
    websocketError,
} = socketSlice.actions
export default socketSlice.reducer

