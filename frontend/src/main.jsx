import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import configureStore from "./store/store";
import "./reset.css";
import * as sessionAction from "./store/reducers/session";
import * as modalActions from "./store/reducers/modals";
import jwtFetch from "./store/jwt";
import * as habitsAction from "./store/reducers/habits";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionAction = sessionAction;
  window.jwtFetch = jwtFetch;
  window.modalActions = modalActions;
  window.habitsAction = habitsAction;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
