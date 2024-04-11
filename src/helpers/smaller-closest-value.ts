/**
 * @fileoverview Helper Function for Finding the Closest Smaller Number
 * This file contains a helper function for finding the closest smaller number in an array.
 *
 * @param {number[]} arr An array of numbers, sorted in ascending order.
 * @param {number} value The value to find the closest smaller number for.
 * @returns {number} The closest smaller number in the array.
 */
export function smallerClosestValue(arr: number[], value: number): number {
  // Initialize the previous value to the first element of the array
  let prevVal = arr[0];

  // Iterate through the array to find the closest smaller number
  for (const val of arr) {
    // If the current value is greater than the target value, return the previous value
    if (val > value) return prevVal;
    // If the current value is equal to the target value, return the current value
    if (val == value) return val;
    // Update the previous value to the current value
    prevVal = val;
  }

  // If no smaller value is found, return the last element of the array
  return arr[arr.length - 1];
}
