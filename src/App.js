import logo from "./logo.svg";
import "./App.css";
import { useAuthAction } from "@authaction/web-sdk/react";

function App() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } =
    useAuthAction();

  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <p>Loading...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isAuthenticated ? (
          <>
            <p>Welcome, {user?.name}</p>
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
                value={JSON.stringify(user, null, 2)}
              />
            </div>
            <button className="App-link" onClick={() => logout()}>
              Logout
            </button>
          </>
        ) : (
          <button className="App-link" onClick={() => loginWithRedirect()}>
            Login
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
