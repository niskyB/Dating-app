import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./container/app/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import UpdateInfoPopup from "./container/UpdateInfoPopup";
import AutoLogingWrapper from "./common/HOC/autoLogingWrapper";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AutoLogingWrapper>
          <App />
        </AutoLogingWrapper>
        <UpdateInfoPopup />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
