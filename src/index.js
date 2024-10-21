import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: `https://${process.env.REACT_APP_AUTHACTION_TENANT_DOMAIN}`,
  client_id: process.env.REACT_APP_AUTHACTION_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_AUTHACTION_REDIRECT_URI,
  post_logout_redirect_uri:
    process.env.REACT_APP_AUTHACTION_LOGOUT_REDIRECT_URI,
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
