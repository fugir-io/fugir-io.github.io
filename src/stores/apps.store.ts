/**
 * @fileoverview Application Management Stores
 * This file contains Svelte stores responsible for managing the state of various aspects of the application,
 * including open and active apps, z-index management, drag state, and fullscreen mode.
 *
 * @requires svelte/store
 * @requires 🍎/configs/apps/apps-config
 */

import { writable } from 'svelte/store';
import type { appsConfig } from '🍎/configs/apps/apps-config';

export type AppID = keyof typeof appsConfig;

/** Which apps are currently open */
export const openApps = writable<Record<AppID, boolean>>({
  wallpapers: false,
  finder: false,
  vscode: false,
  calculator: false,
  safari: false,
  appstore: false,
  calendar: false,
  // 'system-preferences': false,

  developer: false,
  // 'view-source': false,
});

/** Which app is currently focused */
export const activeApp = writable<AppID>('finder');

/**
 * Maximum zIndex for the active app
 * Initialize with -2, so that it becomes 0 when initialised
 */
export const activeAppZIndex = writable(-2);

export const appZIndices = writable<Record<AppID, number>>({
  wallpapers: 0,
  finder: 0,
  vscode: 0,
  calculator: 0,
  safari: 0,
  appstore: 0,
  calendar: 0,
  // 'system-preferences': 0,

  developer: 0,
  // 'view-source': 0,
});

export const isAppBeingDragged = writable(false);

export const appsInFullscreen = writable<Record<AppID, boolean>>({
  wallpapers: false,
  finder: false,
  vscode: false,
  calculator: false,
  safari: false,
  appstore: false,
  calendar: false,
  // 'system-preferences': false,

  developer: false,
  // 'view-source': false,
});
