import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../utils/types';
import {
  profileWsClose,profileWsConnecting,profileWsError,profileWsMessage,profileWsOpen
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
  table: undefined | ITable,
  connectingError: string | undefined
}

const initialState: ILiveTable = {
  status: WebsocketStatus.OFFLINE,
  table: undefined,
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
    .addCase(profileWsError, (state, action: PayloadAction<string | undefined>) => {
        state.connectingError = action.payload;
    })
    .addCase(profileWsMessage, (state, action: PayloadAction<ITable | undefined>) => {
      state.table = action.payload
    })
})
