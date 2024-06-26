import { get, writable } from 'svelte/store';

import createAuth0Client from '@auth0/auth0-spa-js';

import {
  auth0Client,
  isAuthenticated,
  isLoading,
  user,
  error,
  code,
  state,
} from '🍎/stores/auth.store';

const _useAuth0 = () => {
  const initializeAuth0 = async (config = {}) => {
    auth0Client.set(
      await createAuth0Client({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
      }),
    );

    if (!config.onRedirectCallback) {
      config.onRedirectCallback = () =>
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    try {
      const search = window.location.search;

      if ((search.includes('code=') || search.includes('error=')) && search.includes('state=')) {
        console.log('auth.initializeAuth0');
        const params = new URLSearchParams(search);
        for (const [key, value] of params.entries()) {
          console.log(`auth.initializeAuth0 param: key=> ${key} value=>${value}`);
          switch (key) {
            case 'code':
              code.set(value);
              break;
            case 'state':
              state.set(value);
            default:
              break;
          }
        }
        const { appState } = await get(auth0Client).handleRedirectCallback();
        config.onRedirectCallback(appState);
      }
    } catch (err) {
      error.set(err);
    } finally {
      isAuthenticated.set(await get(auth0Client).isAuthenticated());
      user.set((await get(auth0Client).getUser()) || null);
      isLoading.set(false);
    }
  };

  const login = async (options) => {
    await get(auth0Client).loginWithRedirect(options);
  };

  const logout = async (options) => {
    get(auth0Client).logout(options);
  };

  const getAccessToken = async (options) => {
    return await get(auth0Client).getTokenSilently(options);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    error,

    initializeAuth0,
    login,
    logout,
    getAccessToken,
  };
};

export const useAuth0 = _useAuth0();
