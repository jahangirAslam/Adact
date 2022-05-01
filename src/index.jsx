import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from './redux/store'
import "./assets/icons/remixicon.css";
import "./assets/less/yoda-theme.less";
import App from "./containers/App";
import "./font/neo-sans-w1g-204.otf";


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);