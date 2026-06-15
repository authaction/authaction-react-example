import "./App.css";
import { useAuthAction } from "@authaction/web-sdk/react";

function Navbar({ authenticated, onLogin, onSignup, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon-sm">A</span>
        <span className="navbar-title">AuthAction</span>
      </div>
      <div className="navbar-actions">
        {authenticated ? (
          <button className="btn btn-ghost" onClick={onLogout}>
            Sign out
          </button>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={onLogin}>
              Log in
            </button>
            <button className="btn btn-primary btn-sm" onClick={onSignup}>
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function HomePage({ onLogin, onSignup }) {
  return (
    <div className="home-page">
      <main className="hero">
        <p className="hero-eyebrow">Identity &amp; Access Management</p>
        <h1 className="hero-title">Authentication made simple</h1>
        <p className="hero-subtitle">
          Secure, fast, and developer-friendly OAuth2 authentication for your
          applications.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-lg" onClick={onSignup}>
            Get started free
          </button>
          <button className="btn btn-outline btn-lg" onClick={onLogin}>
            Log in
          </button>
        </div>
      </main>
    </div>
  );
}

function RawClaimsPage({ user }) {
  const claims = (({ access_token, profile, ...rest }) => rest)(user ?? {});
  return (
    <main className="claims-main">
      <div className="claims-card">
        <h1 className="claims-title">Raw Claims</h1>
        <pre className="claims-content">{JSON.stringify(claims, null, 2)}</pre>
      </div>
    </main>
  );
}

function LoadingScreen() {
  return (
    <div className="screen-center">
      <div className="spinner" aria-label="Loading" />
    </div>
  );
}

export default function App() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } =
    useAuthAction();

  if (isLoading) return <LoadingScreen />;

  const onLogin = () => loginWithRedirect();
  const onSignup = () => loginWithRedirect({ screen_hint: "signup" });

  return (
    <div className="app">
      <Navbar
        authenticated={isAuthenticated}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={logout}
      />
      {isAuthenticated ? (
        <RawClaimsPage user={user} />
      ) : (
        <HomePage onLogin={onLogin} onSignup={onSignup} />
      )}
    </div>
  );
}
