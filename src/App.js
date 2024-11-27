import logo from "./logo.svg";
import "./App.css";
import { useAuth } from "react-oidc-context";
import { jwtDecode } from "jwt-decode";

function App() {
  const auth = useAuth();

  const handleLogin = () => {
    void auth.signinRedirect();
  };

  const handleLogout = () => {
    void auth.signoutRedirect();
  };

  const decodedIdToken = auth.isAuthenticated
    ? jwtDecode(auth.user.id_token)
    : null;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {auth.isAuthenticated ? (
          <>
            <p>Welcome, {auth.user.profile.name}</p>
            <div>
              <textarea
                style={{
                  width: "800px",
                  height: "250px",
                  padding: "15px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                  resize: "none",
                  overflow: "auto",
                }}
                readOnly
                value={JSON.stringify(decodedIdToken, null, 2)}
              ></textarea>
            </div>
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
