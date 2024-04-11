/**
 * @fileoverview Store for Managing Preference of Reduced Motion
 * This file contains a Svelte store responsible for managing the user's preference for reduced motion.
 * The store is persisted in local storage under the key 'macos:is-reduced-motion'.
 *
 * @requires svelte-local-storage-store
 */

import { persisted } from 'svelte-local-storage-store';

/**
 * Store representing the user's preference for reduced motion.
 * It is persisted in local storage under the key 'macos:is-reduced-motion'.
 * The initial value is determined by whether the user's system setting prefers reduced motion.
 * @type {import('svelte-local-storage-store').PersistedWritable<boolean>}
 */
export const prefersReducedMotion = persisted(
  'macos:is-reduced-motion',
  matchMedia('(prefers-reduced-motion)').matches,
);
