/**
 * @fileoverview Store for Managing Wallpaper Settings
 * This file contains a Svelte store responsible for managing the wallpaper settings of the application.
 * The store holds a persisted wallpaper settings object containing the wallpaper ID, image URL, and control theme flag.
 * The wallpaper settings are persisted in local storage under the key 'macos:wallpaper-settings:v2'.
 *
 * @requires svelte-local-storage-store
 * @requires 🍎/configs/wallpapers/wallpaper.config
 */

import { persisted } from 'svelte-local-storage-store';
import type { WallpaperID } from '🍎/configs/wallpapers/wallpaper.config';

/**
 * Type representing the wallpaper settings.
 * It contains the wallpaper ID, image URL, and a flag indicating whether the wallpaper can control the theme.
 * @typedef {object} WallpaperSettings
 * @property {WallpaperID} id The ID of the wallpaper.
 * @property {string} image The URL of the wallpaper image.
 * @property {boolean} canControlTheme Flag indicating whether the wallpaper can control the theme.
 */

/**
 * Store representing the wallpaper settings of the application.
 * It is a persisted store holding a wallpaper settings object.
 * The initial wallpaper settings object includes the default wallpaper ID, image URL, and control theme flag.
 * @type {import('svelte-local-storage-store').PersistedWritable<WallpaperSettings>}
 */
export const wallpaper = persisted<WallpaperSettings>('macos:wallpaper-settings:v2', {
  image: '46',
  id: 'black-bird-in-a-city',
  canControlTheme: true,
});
