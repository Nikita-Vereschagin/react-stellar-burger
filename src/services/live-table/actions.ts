import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string, "LIVE_TABLE_CONNECT">('LIVE_TABLE_CONNECT')
export const disconnect = createAction<void, "LIVE_TABLE_DISCONNECT">('LIVE_TABLE_DISCONNECT');
export const wsConnecting = createAction<void, "LIVE_TABLE_WS_CONNECTING">('LIVE_TABLE_WS_CONNECTING');
export const wsOpen = createAction<void, "LIVE_TABLE_WS_OPEN">('LIVE_TABLE_WS_OPEN');
export const wsClose = createAction<void, "LIVE_TABLE_WS_CLOSE">('LIVE_TABLE_WS_CLOSE');
export const wsMessage = createAction<void, "LIVE_TABLE_WS_MESSAGE">('LIVE_TABLE_WS_MESSAGE');
export const wsError = createAction<void, "LIVE_TABLE_WS_ERROR">('LIVE_TABLE_WS_ERROR');
