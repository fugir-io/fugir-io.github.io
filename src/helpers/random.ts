/**
 * @fileoverview Helper Function for Generating Random Integer
 * This file contains a helper function for generating a random integer within a specified range.
 *
 * @param {number} lower The lower bound of the range (inclusive).
 * @param {number} upper The upper bound of the range (inclusive).
 * @returns {number} A random integer within the specified range.
 */
export function randint(lower: number, upper: number): number {
  // If lower bound is greater than upper bound, swap them
  if (lower > upper) [lower, upper] = [upper, lower];

  // Generate and return a random integer within the specified range
  return lower + Math.floor((upper - lower) * Math.random());
}
