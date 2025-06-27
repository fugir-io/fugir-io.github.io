// Determine redirect URI based on current environment
const getRedirectUri = () => {
  const origin = window.location.origin;

  // Your allowed callback URLs from Auth0 dashboard
  const allowedUrls = [
    "http://localhost:4040",
    "https://app.fugir.io",
    "https://fugir.io",
    "https://fugir-io.github.io",
    "http://localhost:4173",
  ];

  // Return the current origin if it's in allowed list, otherwise fallback to localhost
  return allowedUrls.includes(origin) ? origin : "http://localhost:4040";
};

export const auth0Config = {
  domain: "dev-06jbbbvvhpso2wm1.us.auth0.com",
  clientId: "kukbzOeytRYmTtAdZy3QFuBfPKPSOgzZ",
  redirectUri: getRedirectUri(),
  audience: undefined, // Add if you have an API
  scope: "openid profile email offline_access", // offline_access for refresh tokens
  useRefreshTokens: true,
  cacheLocation: "localstorage", // Persist tokens in localStorage
  sessionCheckExpiryDays: 1, // Check session validity for 1 day
};
