import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./global/globalCss";
import Provider from "./components/providers/appProvider";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
