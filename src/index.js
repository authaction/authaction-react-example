import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthActionProvider } from "@authaction/web-sdk/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthActionProvider
      domain={process.env.REACT_APP_AUTHACTION_TENANT_DOMAIN}
      clientId={process.env.REACT_APP_AUTHACTION_CLIENT_ID}
      redirectUri={process.env.REACT_APP_AUTHACTION_REDIRECT_URI}
      postLogoutRedirectUri={process.env.REACT_APP_AUTHACTION_LOGOUT_REDIRECT_URI}
      cacheLocation="localstorage"
    >
      <App />
    </AuthActionProvider>
  </React.StrictMode>
);

reportWebVitals();
