import "./App.css";
import { useAuthAction } from "@authaction/web-sdk/react";

function UserAvatar({ user }) {
  if (user?.picture) {
    return <img src={user.picture} alt={user.name} className="avatar" />;
  }
  const initial = user?.name?.[0]?.toUpperCase() ?? "U";
  return <div className="avatar-placeholder">{initial}</div>;
}

function UserProfile({ user, onLogout }) {
  const fields = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Subject", value: user?.sub },
  ].filter((f) => f.value);

  return (
    <div className="card">
      <div className="card-header">
        <UserAvatar user={user} />
        <h1 className="profile-name">{user?.name}</h1>
        <p className="profile-email">{user?.email}</p>
      </div>
      <div className="card-body">
        <h2 className="section-title">Profile</h2>
        <dl className="info-list">
          {fields.map(({ label, value }) => (
            <div key={label} className="info-row">
              <dt className="info-label">{label}</dt>
              <dd className="info-value">{value}</dd>
            </div>
          ))}
        </dl>
        <details className="raw-token">
          <summary>Raw claims</summary>
          <pre className="raw-token-content">{JSON.stringify(user, null, 2)}</pre>
        </details>
      </div>
      <div className="card-footer">
        <button className="btn btn-outline" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}

function LoginCard({ onLogin }) {
  return (
    <div className="card card-centered">
      <div className="brand-icon" aria-hidden="true">A</div>
      <h1 className="login-title">Welcome to AuthAction</h1>
      <p className="login-subtitle">Sign in to continue to your account.</p>
      <button className="btn btn-primary" onClick={onLogin}>
        Sign in
      </button>
    </div>
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      <main className="main">
        {isAuthenticated ? (
          <UserProfile user={user} onLogout={logout} />
        ) : (
          <LoginCard onLogin={loginWithRedirect} />
        )}
      </main>
    </div>
  );
}
