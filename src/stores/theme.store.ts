/**
 * @fileoverview Store for Managing Theme Settings
 * This file contains a Svelte store responsible for managing the theme settings of the application.
 * The store holds a persisted theme object containing the scheme ('light' or 'dark') and primary color.
 * The theme settings are persisted in local storage under the key 'macos:theme-settings'.
 *
 * @requires svelte-local-storage-store
 * @requires 🍎/configs/theme/colors.config
 */

import { persisted } from 'svelte-local-storage-store';
import { colors } from '🍎/configs/theme/colors.config';

/**
 * Type representing the theme settings.
 * It contains a scheme ('light' or 'dark') and a primary color selected from the color configuration.
 * @typedef {object} Theme
 * @property {'light' | 'dark'} scheme The color scheme.
 * @property {keyof typeof colors} primaryColor The primary color key selected from the color configuration.
 */

/**
 * Store representing the theme settings of the application.
 * It is a persisted store holding a theme object.
 * The initial theme object is determined by the user's system preferences and default primary color.
 * @type {import('svelte-local-storage-store').PersistedWritable<Theme>}
 */
export const theme = persisted<Theme>('macos:theme-settings', {
  scheme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  primaryColor: 'blue',
});

/**
 * Subscribe function to handle theme changes and update CSS variables accordingly.
 * @param {Theme} themeSettings The current theme settings.
 */
theme.subscribe(({ scheme, primaryColor }) => {
  // Update color scheme class on document body
  const { classList } = document.body;
  classList.remove('light', 'dark');
  classList.add(scheme);

  // Update CSS variables based on the selected primary color
  const colorObj = colors[primaryColor][scheme];
  const setStyle = (name: string, value: string) => document.body.style.setProperty(name, value);

  setStyle('--system-color-primary', `hsl(${colorObj.hsl})`);
  setStyle('--system-color-primary-hsl', `${colorObj.hsl}`);
  setStyle('--system-color-primary-contrast', `hsl(${colorObj.contrastHsl})`);
  setStyle('--system-color-primary-contrast-hsl', `${colorObj.contrastHsl}`);
});
