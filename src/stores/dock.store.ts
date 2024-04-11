/**
 * @fileoverview Dock Visibility Store
 * This file contains a Svelte store responsible for managing the visibility state of the dock.
 * The dock visibility can be toggled between hidden and visible states through the traffic light control menu.
 *
 * @requires svelte/store
 */

import { writable } from 'svelte/store';

/**
 * Store indicating whether the dock is currently hidden or visible.
 * It is a writable store of type boolean, where `true` indicates the dock is hidden and `false` indicates it's visible.
 * @type {import('svelte/store').Writable<boolean>}
 */
export const isDockHidden = writable(false);
