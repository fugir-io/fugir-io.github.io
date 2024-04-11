/**
 * @fileoverview Transition Functions for Fading In and Out
 * This file contains transition functions for fading elements in and out.
 * The `fadeIn` function fades an element in with a specified duration and delay.
 * The `fadeOut` function fades an element out with a specified duration.
 * 
 * @requires svelte/easing
 */

import { sineIn, sineOut } from 'svelte/easing';

/**
 * Transition function for fading an element in.
 * It applies a sine easing function to smoothly fade in the element.
 * @param {HTMLElement} _ The target element (unused).
 * @param {SvelteTransitionConfig} [duration=150] The duration of the fade-in animation in milliseconds.
 * @param {SvelteTransitionConfig} [delay=duration] The delay before starting the fade-in animation in milliseconds.
 * @returns {SvelteTransitionReturnType} The transition configuration for fading in the element.
 */
export function fadeIn(
  _: HTMLElement,
  { duration = 150, delay = duration }: SvelteTransitionConfig = {},
): SvelteTransitionReturnType {
  return {
    duration: duration + 10,
    delay,
    easing: sineIn,
    css: (t) => `opacity: ${t}`,
  };
}

/**
 * Transition function for fading an element out.
 * It applies a sine easing function to smoothly fade out the element.
 * @param {HTMLElement} _ The target element (unused).
 * @param {SvelteTransitionConfig} [duration=150] The duration of the fade-out animation in milliseconds.
 * @returns {SvelteTransitionReturnType} The transition configuration for fading out the element.
 */
export function fadeOut(
  _: HTMLElement,
  { duration = 150 }: SvelteTransitionConfig = {},
): SvelteTransitionReturnType {
  return {
    duration
