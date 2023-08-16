import React from "react";
import ReactDOM from "react-dom";
import { ActionCreatorWithoutPayload, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import rootReducer from "./services/reducers/rootReducer";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socket-middleware";
import {
  connect as LiveTableWsConnect,
  disconnect as LiveTableWsDisconnect,
  wsOpen as LiveTableWsOpen,
  wsClose as LiveTableWsClose,
  wsMessage as LiveTableWsMessage,
  wsError as LiveTableWsError,
  wsConnecting as LiveTableWsConnecting
} from "./services/live-table/actions";
import {
  profileConnect as ProfleLiveTableWsConnect,
  profileDisconnect as ProfleLiveTableWsDisconnect,
  profileWsOpen as ProfleLiveTableWsOpen,
  profileWsClose as ProfleLiveTableWsClose,
  profileWsMessage as ProfleLiveTableWsMessage,
  profileWsError as ProfleLiveTableWsError,
  profileWsConnecting as ProfleLiveTableWsConnecting
} from "./services/profile-live-table/actions";

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

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveTableMiddleware,profileLiveTableMiddleware);
  } , 
  devTools: process.env.NODE_ENV !== 'production',})

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  export const useDispatch = () => dispatchHook<AppDispatch>();
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
      
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
