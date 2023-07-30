import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./services/reducers/rootReducer";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";

const store = configureStore({reducer: rootReducer, devTools: process.env.NODE_ENV !== 'production',})

const store = configureStore({reducer: rootReducer, devTools: process.env.NODE_ENV !== 'production',})

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
