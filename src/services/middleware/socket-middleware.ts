import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { MiddlewareAPI } from "redux";

interface IAction {type: string, payload: string | URL}

export const socketMiddleware = (wsActions: {[key: string]: ActionCreatorWithPayload<string> | ActionCreatorWithPayload<void>}) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: Dispatch<IAction>) => (action:  IAction) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;
// Не пойму, что он от меня хочет. Пожалуйста, намекните ;0
      if (type === wsConnect.type) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event: Event | string) => {
          dispatch(onError(event));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(onMessage(parsedData));
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        if (wsSendMessage && type === wsSendMessage.type) {
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.type === type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
