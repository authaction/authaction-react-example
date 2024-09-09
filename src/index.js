import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthConfig from "./config.json";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: `https://${AuthConfig.tenantDomain}`,
  client_id: AuthConfig.clientId,
  redirect_uri: AuthConfig.redirectUri,
  post_logout_redirect_uri: AuthConfig.logoutRedirectUri,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
