import { socketMiddleware } from "./middleware/socket-middleware";
import {
  connect as LiveTableWsConnect,
  disconnect as LiveTableWsDisconnect,
  wsOpen as LiveTableWsOpen,
  wsClose as LiveTableWsClose,
  wsMessage as LiveTableWsMessage,
  wsError as LiveTableWsError,
  wsConnecting as LiveTableWsConnecting
} from "./live-table/actions";
import {
  profileConnect as ProfleLiveTableWsConnect,
  profileDisconnect as ProfleLiveTableWsDisconnect,
  profileWsOpen as ProfleLiveTableWsOpen,
  profileWsClose as ProfleLiveTableWsClose,
  profileWsMessage as ProfleLiveTableWsMessage,
  profileWsError as ProfleLiveTableWsError,
  profileWsConnecting as ProfleLiveTableWsConnecting
} from "./profile-live-table/actions";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

const liveTableMiddleware = socketMiddleware({
  wsConnect: LiveTableWsConnect,
  wsDisconnect: LiveTableWsDisconnect,
  wsConnecting: LiveTableWsConnecting,
  onOpen: LiveTableWsOpen,
  onClose: LiveTableWsClose,
  onError: LiveTableWsError,
  onMessage: LiveTableWsMessage,
})

const profileLiveTableMiddleware = socketMiddleware({
  wsConnect: ProfleLiveTableWsConnect,
  wsDisconnect: ProfleLiveTableWsDisconnect,
  wsConnecting: ProfleLiveTableWsConnecting,
  onOpen: ProfleLiveTableWsOpen,
  onClose: ProfleLiveTableWsClose,
  onError: ProfleLiveTableWsError,
  onMessage: ProfleLiveTableWsMessage,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveTableMiddleware,profileLiveTableMiddleware);
  } , 
  devTools: process.env.NODE_ENV !== 'production',})