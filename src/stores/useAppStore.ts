import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppConfig, AppProperties } from '🚀/types/app.types';

interface AppStore {
  // State
  appProperties: AppProperties;
  
  // Actions
  getApp: (appName: string) => AppConfig | undefined;
  setApp: (appName: string, config: AppConfig) => void;
  updateApp: (appName: string, updates: Partial<AppConfig>) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      appProperties: {},

      // Actions
      getApp: (appName: string) => {
        const { appProperties } = get();
        return appProperties[appName];
      },

      setApp: (appName: string, config: AppConfig) => {
        set((state) => ({
          appProperties: {
            ...state.appProperties,
            [appName]: config,
          },
        }));
      },

      updateApp: (appName: string, updates: Partial<AppConfig>) => {
        set((state) => ({
          appProperties: {
            ...state.appProperties,
            [appName]: {
              ...state.appProperties[appName],
              ...updates,
            },
          },
        }));
      },
    }),
    {
      name: 'macos:app-properties',
      partialize: (state) => ({ appProperties: state.appProperties }),
    }
  )
);