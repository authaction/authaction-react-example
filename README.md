# React OAuth2 Integration with Authaction

This is a React application demonstrating how to integrate OAuth2 authentication using [AuthAction](https://app.authaction.com/) with the `react-oidc-context` library.

## Overview

This application showcases how to configure and handle authentication and logout using Authaction’s OAuth2 service. The setup includes:

- Redirecting users to the login page.
- Handling successful authentication and displaying user information.
- Logging out users and redirecting them to the specified logout URL.

## Prerequisites

Before using this application, ensure you have:

1. **Node.js and npm installed**: You can download and install them from [nodejs.org](https://nodejs.org/).

2. **Authaction OAuth2 credentials**: You will need to have the `tenantDomain`, `clientId`, and relevant URIs from your Authaction setup.

## Installation

1. **Clone the repository** (if applicable):

   ```bash
   git clone git@github.com:authaction/authaction-react-example.git
   cd authaction-react-example
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure your Authaction credentials**:

   Edit `src/config.json` and replace the placeholders with your Authaction OAuth2 details:

   ```json
   {
     "tenantDomain": "your-tenant-domain",
     "clientId": "your-client-id",
     "redirectUri": "http://localhost:3000/",
     "logoutRedirectUri": "http://localhost:3000/"
   }
   ```

## Usage

1. **Start the development server**:

   ```bash
   npm start
   ```

   This will start the React application on `http://localhost:3000`.

2. **Testing Authentication**:

   - Open your browser and navigate to `http://localhost:3000`.
   - Click the "Login" button to be redirected to the Authaction login page.
   - After successful login, you will be redirected back to the application with a welcome message showing your email and a "Logout" button.
   - Click the "Logout" button to be logged out and redirected to the specified logout URL.

## Code Explanation

### Configuration (`src/index.js`)

- **AuthProvider Setup**:
  - Configures the OAuth2 authentication using `react-oidc-context`.
  - Sets up `authority`, `client_id`, `redirect_uri`, and `post_logout_redirect_uri` based on the credentials from `config.json`.
  - `onSigninCallback` handles the cleanup of the URL after the sign-in callback.

### Application Component (`src/App.js`)

- **Login and Logout Handling**:
  - `handleLogin` triggers a redirect to the Authaction login page.
  - `handleLogout` triggers a redirect to the Authaction logout page.
  - The application conditionally displays a welcome message and logout button if the user is authenticated. Otherwise, it shows a login button.

## Common Issues

- **Redirects not working**:

  - Ensure that the `redirectUri` and `logoutRedirectUri` match the URIs configured in your [AuthAction](https://app.authaction.com/) application settings.
  - Make sure the application is running on the same port as specified in the `redirectUri`.

- **Network Errors**:
  - Verify that your network allows traffic to the Authaction servers and that there are no firewall rules blocking the OAuth2 redirects.

## Contributing

Feel free to submit issues or pull requests if you find any bugs or have improvements to suggest.
