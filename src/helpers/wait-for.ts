/**
 * @fileoverview Utility Function for Waiting
 * This file contains a utility function for waiting for a specified amount of time.
 *
 * @param {number} time The time to wait in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified time has elapsed.
 */
export const waitFor = (time: number): Promise<void> => new Promise((res) => setTimeout(res, time));
