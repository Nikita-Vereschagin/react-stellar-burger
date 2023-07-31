import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wsConnected: false,
    data: []
  };
  

const socketSlice = createSlice({
    name: 'SOCKET',
    initialState: initialState,
    reducers: {
        WS_CONNECTION_START: (state) => {
            state.wsConnected = true
        },
        WS_CONNECTION_SUCCESS: (state) => {
            state.wsConnected = true
        },
        WS_CONNECTION_ERROR: (state) => {
            state.wsConnected = false
        },
        WS_CONNECTION_CLOSED: (state) => {
            state.wsConnected = false
        },
        WS_GET_DATA: (state, action) => {
            state.data = action.payload
        }
        }
})
export const { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_DATA, WS_CONNECTION_START } = socketSlice.actions

export default socketSlice