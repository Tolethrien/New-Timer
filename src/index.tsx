import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./global/globalCss";
import Provider from "./global/provider";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
