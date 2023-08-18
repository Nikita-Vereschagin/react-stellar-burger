import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface IAction {type: string, payload: string | URL} 

export const socketMiddleware = (wsActions: {[key: string]: ActionCreatorWithPayload<string> | ActionCreatorWithPayload<void>}) => {
  return (store:{ dispatch: (type: IAction) => void}) => {
    let socket: WebSocket | null = null;

    return (next: (arg: IAction) => void) => (action:  IAction) => {
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
