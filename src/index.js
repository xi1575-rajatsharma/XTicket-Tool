import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.scss";
import { routes as Routes } from "./routes/index";
import * as serviceWorker from "./serviceWorker";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Redux Imports
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./app/redux/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
