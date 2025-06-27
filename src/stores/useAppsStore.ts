import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the available app IDs based on the original configuration
export type AppID =
  | "wallpapers"
  | "finder"
  | "vscode"
  | "calculator"
  | "safari"
  | "appstore"
  | "calendar"
  | "developer"
  | "terminal";

interface AppsStore {
  // State
  openApps: Record<AppID, boolean>;
  activeApp: AppID;
  activeAppZIndex: number;
  appZIndices: Record<AppID, number>;
  isAppBeingDragged: boolean;
  appsInFullscreen: Record<AppID, boolean>;

  // Actions
  openApp: (appId: AppID) => void;
  closeApp: (appId: AppID) => void;
  setActiveApp: (appId: AppID) => void;
  setAppZIndex: (appId: AppID, zIndex: number) => void;
  setAppBeingDragged: (isDragging: boolean) => void;
  toggleAppFullscreen: (appId: AppID) => void;
  setAppFullscreen: (appId: AppID, isFullscreen: boolean) => void;
}

const initialOpenApps: Record<AppID, boolean> = {
  wallpapers: false,
  finder: false,
  vscode: false,
  calculator: false,
  safari: false,
  appstore: false,
  calendar: false,
  developer: false,
  terminal: false,
};

const initialAppZIndices: Record<AppID, number> = {
  wallpapers: 0,
  finder: 0,
  vscode: 0,
  calculator: 0,
  safari: 0,
  appstore: 0,
  calendar: 0,
  developer: 0,
  terminal: 0,
};

const initialAppsInFullscreen: Record<AppID, boolean> = {
  wallpapers: false,
  finder: false,
  vscode: false,
  calculator: false,
  safari: false,
  appstore: false,
  calendar: false,
  developer: false,
  terminal: false,
};

export const useAppsStore = create<AppsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      openApps: initialOpenApps,
      activeApp: "finder" as AppID,
      activeAppZIndex: -2,
      appZIndices: initialAppZIndices,
      isAppBeingDragged: false,
      appsInFullscreen: initialAppsInFullscreen,

      // Actions
      openApp: (appId: AppID) => {
        const { activeAppZIndex } = get();
        set((state) => ({
          openApps: {
            ...state.openApps,
            [appId]: true,
          },
          // Automatically focus the newly opened app and bring it to front
          activeApp: appId,
          activeAppZIndex: activeAppZIndex + 2,
          appZIndices: {
            ...state.appZIndices,
            [appId]: activeAppZIndex + 2,
          },
        }));
      },

      closeApp: (appId: AppID) => {
        set((state) => ({
          openApps: {
            ...state.openApps,
            [appId]: false,
          },
          appsInFullscreen: {
            ...state.appsInFullscreen,
            [appId]: false,
          },
        }));
      },

      setActiveApp: (appId: AppID) => {
        const { activeAppZIndex } = get();
        set((state) => ({
          activeApp: appId,
          activeAppZIndex: activeAppZIndex + 2,
          appZIndices: {
            ...state.appZIndices,
            [appId]: activeAppZIndex + 2,
          },
        }));
      },

      setAppZIndex: (appId: AppID, zIndex: number) => {
        set((state) => ({
          appZIndices: {
            ...state.appZIndices,
            [appId]: zIndex,
          },
        }));
      },

      setAppBeingDragged: (isDragging: boolean) => {
        set({ isAppBeingDragged: isDragging });
      },

      toggleAppFullscreen: (appId: AppID) => {
        set((state) => ({
          appsInFullscreen: {
            ...state.appsInFullscreen,
            [appId]: !state.appsInFullscreen[appId],
          },
        }));
      },

      setAppFullscreen: (appId: AppID, isFullscreen: boolean) => {
        set((state) => ({
          appsInFullscreen: {
            ...state.appsInFullscreen,
            [appId]: isFullscreen,
          },
        }));
      },
    }),
    {
      name: "macos:apps-state",
      partialize: (state) => ({
        openApps: state.openApps,
        appsInFullscreen: state.appsInFullscreen,
      }),
    },
  ),
);
