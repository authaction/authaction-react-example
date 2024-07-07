import logo from "./logo.svg";
import "./App.css";
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const handleLogin = () => {
    void auth.signinRedirect();
  };

  const handleLogout = () => {
    void auth.signoutRedirect();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {auth.user?.profile?.email ? (
          <>
            <p>Welcome, {auth.user.profile.email}</p>
            <button className="App-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="App-link" onClick={handleLogin}>
            Login
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
