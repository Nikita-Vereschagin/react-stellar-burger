import { createAction } from '@reduxjs/toolkit';

export const profileConnect = createAction<string, "PROFILE_LIVE_TABLE_CONNECT">('PROFILE_LIVE_TABLE_CONNECT')
export const profileDisconnect = createAction<void, "PROFILE_LIVE_TABLE_DISCONNECT">('PROFILE_LIVE_TABLE_DISCONNECT');
export const profileWsConnecting = createAction<void, "PROFILE_LIVE_TABLE_WS_CONNECTING">('PROFILE_LIVE_TABLE_WS_CONNECTING');
export const profileWsOpen = createAction<void, "PROFILE_LIVE_TABLE_WS_OPEN">('PROFILE_LIVE_TABLE_WS_OPEN');
export const profileWsClose = createAction<void, "PROFILE_LIVE_TABLE_WS_CLOSE">('PROFILE_LIVE_TABLE_WS_CLOSE');
export const profileWsMessage = createAction<void, "PROFILE_LIVE_TABLE_WS_MESSAGE">('PROFILE_LIVE_TABLE_WS_MESSAGE');
export const profileWsError = createAction<void, "PROFILE_LIVE_TABLE_WS_ERROR">('PROFILE_LIVE_TABLE_WS_ERROR');
