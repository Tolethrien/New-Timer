import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./globalCss";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/providers/authProvider";
import DisplayModeProvider from "./components/providers/displayModeProvider";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <AuthProvider>
        <DisplayModeProvider>
          <App />
        </DisplayModeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
