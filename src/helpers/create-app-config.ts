import { setApp } from '🍎/stores/app.store';
import { type AppConfig } from '🍎/stores/app.type';

/**
 * Function to create a complete application configuration with default values.
 * It takes an AppConfig object as input and merges it with default configuration values.
 * @param {AppConfig} et The partial application configuration.
 * @param {string} appName The name of the app.
 * @returns {AppConfig} The complete application configuration.
 */
export const createAppConfig = (et: AppConfig, appName: string) => {
  // Create the complete application configuration with default values
  const appConfig = {
    shouldOpenWindow: true,
    dockBreaksBefore: false,
    resizable: true,
    isResizing: false,
    expandable: false,
    isExpanding: false,
    isVisible: false,
    top: 10,
    left: 10,
    width: 600,
    height: 500,
    ...et,
  };

  // Set the app properties in the store
  console.log(`SETTING ${appName} app.data`, appConfig);
  setApp(appName, appConfig);

  // Return the complete application configuration
  return appConfig;
};
