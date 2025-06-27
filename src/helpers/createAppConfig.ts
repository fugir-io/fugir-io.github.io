import { AppConfig } from "@/types/app.types";
import { useAppStore } from "@/stores/useAppStore";

/**
 * Function to create a complete application configuration with default values.
 * It takes an AppConfig object as input and merges it with default configuration values.
 * @param config The partial application configuration.
 * @param appName The name of the app.
 * @returns The complete application configuration.
 */
export const createAppConfig = (
  config: Partial<AppConfig>,
  appName: string,
): AppConfig => {
  // Create the complete application configuration with default values
  const appConfig: AppConfig = {
    title: "",
    resizable: true,
    isResizing: false,
    expandable: false,
    isExpanding: false,
    draggingEnabled: true,
    isDragging: false,
    isMaximized: false,
    isVisible: true,
    top: 10,
    left: 10,
    width: 600,
    height: 500,
    shouldOpenWindow: true,
    dockBreaksBefore: false,
    // apply overrides
    ...config,
  };

  // Set the app properties in the store (this will be called during initialization)
  console.log(`SETTING ${appName} app.data`, appConfig);

  // Return the complete application configuration
  return appConfig;
};

/**
 * Hook to initialize app configuration in the store
 */
export const useInitializeAppConfig = () => {
  const setApp = useAppStore((state) => state.setApp);

  return (appName: string, config: AppConfig) => {
    setApp(appName, config);
  };
};
