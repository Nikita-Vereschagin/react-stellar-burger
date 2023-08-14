import { createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../utils/live-table';
import {
  profileWsClose,profileWsConnecting,profileWsError,profileWsMessage,profileWsOpen
} from './actions';

const initialState = {
  status: WebsocketStatus.OFFLINE,
  table: [],
  connectingError: ''
}

export const profileLiveTableReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(profileWsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
      })
    .addCase(profileWsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = '';
    })
    .addCase(profileWsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(profileWsError, (state, action) => {
        state.connectingError = action.payload;
    })
    .addCase(profileWsMessage, (state, action) => {
      state.table = action.payload
    })
})
