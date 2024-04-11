/**
 * @fileoverview Menu Bar Stores
 * This file contains Svelte stores responsible for managing the state of the menu bar,
 * including the menu configurations, active menu, and notch visibility.
 *
 * @requires svelte/store
 * @requires svelte-local-storage-store
 * @requires 🍎/configs/menu/finder.menu.config
 */

import { writable } from 'svelte/store';
import { persisted as localWritable } from 'svelte-local-storage-store';
import { finderMenuConfig } from '🍎/configs/menu/finder.menu.config';

// Define menu configurations for different apps
const menuConfigs = { finder: finderMenuConfig };

/**
 * Store containing the configuration of the menu bar menus.
 * It is a writable store initialized with the menu configuration for the Finder app.
 * @type {import('svelte/store').Writable<Record<string, any>>}
 */
export const menuBarMenus = writable(
  // Uncomment when all apps get their own menus
  // (get) => menuConfigs[get(activeAppStore) as keyof typeof menuConfigs],
  menuConfigs.finder,
);

/**
 * Store containing the ID of the currently active menu.
 * It is a writable store initialized with an empty string.
 * @type {import('svelte/store').Writable<string>}
 */
export const activeMenu = writable('');

/**
 * Store indicating whether the notch should be shown in the UI.
 * It is a persisted writable store from local storage, initialized with `false`.
 * @type {import('svelte-local-storage-store').PersistedWritable<boolean>}
 */
export const shouldShowNotch = localWritable('macos:setting:should-show-notch', false);
