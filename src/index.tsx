import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./globalCss";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/providers/authProvider";
import ThemeProvider from "./components/providers/themeProvider";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
