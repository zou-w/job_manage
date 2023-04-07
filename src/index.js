import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@/assets/css/reset.css";

//引入路由
import { HashRouter } from "react-router-dom";

//引入redux
import { Provider } from "react-redux";
import store from "@/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
