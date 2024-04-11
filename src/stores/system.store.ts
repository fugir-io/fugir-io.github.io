/**
 * @fileoverview Store for Managing System Update Status
 * This file contains a Svelte store responsible for managing the status of system updates.
 * The store holds a boolean value indicating whether the system needs an update.
 *
 * @requires svelte/store
 */

import { writable } from 'svelte/store';

/**
 * Store representing the status of system updates.
 * It is a writable store initialized with the value `false`, indicating that the system does not need an update.
 * @type {import('svelte/store').Writable<boolean>}
 */
export const systemNeedsUpdate = writable(false);
