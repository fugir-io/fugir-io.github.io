/**
 * @fileoverview Auth Store
 * This file exports Svelte writable stores for managing Auth0-related data.
 *
 * @requires svelte/store
 */

import { writable } from 'svelte/store';

/**
 * Svelte writable store for the Auth0 client.
 */
export const auth0Client = writable(null);

/**
 * Svelte writable store for the authentication status.
 */
export const isAuthenticated = writable(false);

/**
 * Svelte writable store for the loading state.
 */
export const isLoading = writable(true);

/**
 * Svelte writable store for the user data.
 */
export const user = writable(null);

/**
 * Svelte writable store for errors.
 */
export const error = writable(null);

/**
 * Svelte writable store for the authentication code.
 */
export const code = writable(null);

/**
 * Svelte writable store for the authentication state.
 */
export const state = writable(null);
