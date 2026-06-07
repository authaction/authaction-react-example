# React OAuth2 Integration with AuthAction

This is a React application demonstrating how to integrate OAuth2 authentication using [AuthAction](https://app.authaction.com/) with the `@authaction/web-sdk` library.

## Overview

This application showcases how to configure and handle authentication and logout using AuthAction's OAuth2 service. The setup includes:

- Redirecting users to the login page.
- Handling successful authentication and displaying user information.
- Logging out users and redirecting them to the specified logout URL.

## Prerequisites

Before using this application, ensure you have:

1. **Node.js and npm installed**: You can download and install them from [nodejs.org](https://nodejs.org/).

2. **AuthAction OAuth2 credentials**: You will need the `tenantDomain`, `clientId`, and relevant URIs from your AuthAction setup.

## Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:authaction/authaction-react-example.git
   cd authaction-react-example
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure your AuthAction credentials**:

   Create a `.env` file in the project root:

   ```bash
   REACT_APP_AUTHACTION_TENANT_DOMAIN=your-authaction-tenant-domain
   REACT_APP_AUTHACTION_CLIENT_ID=your-authaction-app-clientid
   REACT_APP_AUTHACTION_REDIRECT_URI=http://localhost:3000/
   REACT_APP_AUTHACTION_LOGOUT_REDIRECT_URI=http://localhost:3000/
   ```

## Usage

1. **Start the development server**:

   ```bash
   npm start
   ```

   This will start the React application on `http://localhost:3000`.

2. **Testing Authentication**:

   - Open your browser and navigate to `http://localhost:3000`.
   - Click the "Login" button to be redirected to the AuthAction login page.
   - After successful login, you will be redirected back to the application with a welcome message showing your name and profile details.
   - Click the "Logout" button to be logged out and redirected to the specified logout URL.

## Code Explanation

### Entry point (`src/index.js`)

Wraps the app with `AuthActionProvider`, passing your tenant domain, client ID, and redirect URIs:

```jsx
import { AuthActionProvider } from '@authaction/web-sdk/react';

<AuthActionProvider
  domain={process.env.REACT_APP_AUTHACTION_TENANT_DOMAIN}
  clientId={process.env.REACT_APP_AUTHACTION_CLIENT_ID}
  redirectUri={process.env.REACT_APP_AUTHACTION_REDIRECT_URI}
  postLogoutRedirectUri={process.env.REACT_APP_AUTHACTION_LOGOUT_REDIRECT_URI}
>
  <App />
</AuthActionProvider>
```

### Application Component (`src/App.js`)

Uses the `useAuthAction` hook to read auth state and trigger login/logout:

```jsx
import { useAuthAction } from '@authaction/web-sdk/react';

function App() {
  const { isLoading, isAuthenticated, user, loginWithRedirect, logout } = useAuthAction();

  if (isLoading) return <p>Loading...</p>;

  return isAuthenticated ? (
    <>
      <p>Welcome, {user?.name}</p>
      <button onClick={() => logout()}>Logout</button>
    </>
  ) : (
    <button onClick={() => loginWithRedirect()}>Login</button>
  );
}
```

## Common Issues

- **Redirects not working**:

  - Ensure that the `redirectUri` and `postLogoutRedirectUri` match the URIs configured in your [AuthAction](https://app.authaction.com/) application settings.
  - Make sure the application is running on the same port as specified in the `redirectUri`.

- **Network Errors**:
  - Verify that your network allows traffic to the AuthAction servers and that there are no firewall rules blocking the OAuth2 redirects.

## Contributing

Feel free to submit issues or pull requests if you find any bugs or have improvements to suggest.
