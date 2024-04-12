import { writable, get } from 'svelte/store';
import { type AppConfig } from './app.type';

// Define the AppProperties type
export type AppProperties = Record<string, AppConfig>;

// Create a writable store for app properties
export const appProperties = writable<AppProperties>({});

// Function to get an app by name from the app properties store
export const getApp = (appName: string) => {
  const props = get(appProperties);
  return props[appName];
};

// Function to set an app by name in the app properties store
export const setApp = (appName: string, config: AppConfig) => {
  appProperties.update((props) => {
    // Create a new object by spreading the existing properties
    const updatedProps = { ...props };
    // Update the configuration for the specified app
    updatedProps[appName] = config;
    return updatedProps;
  });
};
