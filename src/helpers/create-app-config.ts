/**
 * @fileoverview Helpers for Creating Application Configuration
 * This file contains helper functions for creating application configurations.
 * It defines the AppConfig type representing the configuration options for an application.
 * Additionally, it provides the createAppConfig function to create a complete application configuration.
 */

/**
 * Type representing the configuration options for an application.
 * @typedef {object} AppConfig
 * @property {string} title The title of the application.
 * @property {boolean} [resizable=true] Whether the application window is resizable.
 * @property {boolean} [expandable=false] Whether the application window is expandable.
 * @property {string|number} [height='500'] The height of the application window.
 * @property {string|number} [width='600'] The width of the application window.
 * @property {boolean} [shouldOpenWindow=true] Whether the application window should open by default.
 * @property {(e: unknown) => void} [externalAction] The action to perform when the dock button is clicked.
 * @property {boolean} [dockBreaksBefore=false] Whether there should be a break in the dock before this app.
 */

/**
 * Function to create a complete application configuration with default values.
 * It takes an AppConfig object as input and merges it with default configuration values.
 * @param {AppConfig} et The partial application configuration.
 * @returns {AppConfig} The complete application configuration.
 */
export const createAppConfig = (et: AppConfig) => ({
  shouldOpenWindow: true,
  dockBreaksBefore: false,

  resizable: true,
  expandable: false,

  width: 600,
  height: 500,
  ...et,
});
