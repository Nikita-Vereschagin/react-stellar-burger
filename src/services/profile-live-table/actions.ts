import { createAction } from '@reduxjs/toolkit';

export const profileConnect = createAction<string>('PROFILE_LIVE_TABLE_CONNECT')
export const profileDisconnect = createAction('PROFILE_LIVE_TABLE_DISCONNECT');
export const profileWsConnecting = createAction('PROFILE_LIVE_TABLE_WS_CONNECTING');
export const profileWsOpen = createAction('PROFILE_LIVE_TABLE_WS_OPEN');
export const profileWsClose = createAction('PROFILE_LIVE_TABLE_WS_CLOSE');
export const profileWsMessage = createAction('PROFILE_LIVE_TABLE_WS_MESSAGE');
export const profileWsError = createAction<string, 'PROFILE_LIVE_TABLE_WS_ERROR'>('PROFILE_LIVE_TABLE_WS_ERROR');

export type TLiveTableProfileActions =
  | ReturnType<typeof profileConnect>
  | ReturnType<typeof profileDisconnect>
  | ReturnType<typeof profileWsConnecting>
  | ReturnType<typeof profileWsOpen>
  | ReturnType<typeof profileWsClose>
  | ReturnType<typeof profileWsMessage>
  | ReturnType<typeof profileWsError>;
