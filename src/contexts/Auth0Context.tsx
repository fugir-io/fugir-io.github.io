import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import createAuth0Client, { Auth0Client, User } from '@auth0/auth0-spa-js';
import { auth0Config } from '../config/auth0.config';

interface Auth0ContextType {
  auth0Client: Auth0Client | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | undefined;
  error: string | null;
  loginWithRedirect: (connection?: string) => Promise<void>;
  logout: () => void;
  getAccessTokenSilently: () => Promise<string>;
}

const Auth0Context = createContext<Auth0ContextType | null>(null);

export const useAuth0 = (): Auth0ContextType => {
  const context = useContext(Auth0Context);
  if (!context) {
    throw new Error('useAuth0 must be used within an Auth0Provider');
  }
  return context;
};

interface Auth0ProviderProps {
  children: ReactNode;
}

export const Auth0Provider: React.FC<Auth0ProviderProps> = ({ children }) => {
  const [auth0Client, setAuth0Client] = useState<Auth0Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth0 = async () => {
      try {
        console.log('Initializing Auth0 with config:', {
          domain: auth0Config.domain,
          clientId: auth0Config.clientId,
          redirectUri: auth0Config.redirectUri,
          audience: auth0Config.audience,
          scope: auth0Config.scope,
        });

        const client = await createAuth0Client({
          domain: auth0Config.domain,
          client_id: auth0Config.clientId,
          redirect_uri: auth0Config.redirectUri,
          audience: auth0Config.audience,
          scope: auth0Config.scope,
          useRefreshTokens: auth0Config.useRefreshTokens,
          cacheLocation: auth0Config.cacheLocation as any,
        });

        console.log('Auth0 client created successfully');
        setAuth0Client(client);

        // Check if we're returning from a redirect
        const query = window.location.search;
        if (query.includes('code=') && query.includes('state=')) {
          try {
            await client.handleRedirectCallback();
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (error: any) {
            console.error('Error handling redirect callback:', error);
            setError(error.message || 'Authentication failed');
          }
        }

        // Check authentication status
        const authenticated = await client.isAuthenticated();
        setIsAuthenticated(authenticated);

        if (authenticated) {
          const userData = await client.getUser();
          setUser(userData);
          // Clear any previous errors if user is authenticated
          setError(null);
          console.log('User authenticated successfully:', userData);
        }
      } catch (error: any) {
        console.error('Error initializing Auth0:', error);
        setError(error.message || 'Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth0();
  }, []);

  const loginWithRedirect = async (connection?: string) => {
    if (!auth0Client) return;
    
    try {
      setError(null);
      const loginOptions: any = {};
      
      if (connection) {
        console.log(`Attempting login with connection: ${connection}`);
        loginOptions.connection = connection;
      } else {
        console.log('Attempting default Auth0 login');
      }
      
      await auth0Client.loginWithRedirect(loginOptions);
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
      
      // Log specific error details for social login failures
      if (connection) {
        console.error(`Social login failed for connection: ${connection}`, error);
        setError(`${connection} login failed. You can try the Auth0 login below.`);
      }
    }
  };

  const logout = () => {
    if (!auth0Client) return;
    
    auth0Client.logout({
      returnTo: window.location.origin,
    });
  };

  const getAccessTokenSilently = async (): Promise<string> => {
    if (!auth0Client) {
      throw new Error('Auth0 client not initialized');
    }
    
    try {
      return await auth0Client.getTokenSilently();
    } catch (error: any) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

  const value: Auth0ContextType = {
    auth0Client,
    isLoading,
    isAuthenticated,
    user,
    error,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  };

  return (
    <Auth0Context.Provider value={value}>
      {children}
    </Auth0Context.Provider>
  );
};