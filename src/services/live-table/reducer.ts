import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../utils/live-table';
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from './actions';

interface ITable {
  success: boolean,
  orders: {
    ingredients: string[],
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string
  }[],
  total: number,
  totalToday: number
} 

interface ILiveTable {
  status: string | undefined,
  table:  undefined | ITable | {},
  connectingError: string | undefined
}

const initialState: ILiveTable = {
  status: WebsocketStatus.OFFLINE,
  table: {},
  connectingError: ''
}

export const liveTableReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
      })
    .addCase(wsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = '';
    })
    .addCase(wsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action: PayloadAction<string | undefined>) => {
        state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action: PayloadAction<ITable | undefined>) => {
      state.table = action.payload
    })
})
