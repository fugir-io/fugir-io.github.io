import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SystemStore {
  // State
  wallpaper: string;
  cursorType: string;
  isDockVisible: boolean;
  dockPosition: 'bottom' | 'left' | 'right';
  dockSize: 'small' | 'medium' | 'large';
  menuBarVisible: boolean;
  prefersReducedMotion: boolean;
  bootComplete: boolean;
  showBootScreen: boolean;

  // Actions
  setWallpaper: (wallpaper: string) => void;
  setCursorType: (cursorType: string) => void;
  setDockVisible: (visible: boolean) => void;
  setDockPosition: (position: 'bottom' | 'left' | 'right') => void;
  setDockSize: (size: 'small' | 'medium' | 'large') => void;
  setMenuBarVisible: (visible: boolean) => void;
  setPrefersReducedMotion: (prefers: boolean) => void;
  setBootComplete: (complete: boolean) => void;
  setShowBootScreen: (show: boolean) => void;
  resetSystemSettings: () => void;
}

export const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      // Initial state
      wallpaper: 'default',
      cursorType: 'default',
      isDockVisible: true,
      dockPosition: 'bottom',
      dockSize: 'medium',
      menuBarVisible: true,
      prefersReducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      bootComplete: false,
      showBootScreen: true,

      // Actions
      setWallpaper: (wallpaper: string) => {
        set({ wallpaper });
      },

      setCursorType: (cursorType: string) => {
        set({ cursorType });
      },

      setDockVisible: (visible: boolean) => {
        set({ isDockVisible: visible });
      },

      setDockPosition: (position: 'bottom' | 'left' | 'right') => {
        set({ dockPosition: position });
      },

      setDockSize: (size: 'small' | 'medium' | 'large') => {
        set({ dockSize: size });
      },

      setMenuBarVisible: (visible: boolean) => {
        set({ menuBarVisible: visible });
      },

      setPrefersReducedMotion: (prefers: boolean) => {
        set({ prefersReducedMotion: prefers });
      },

      setBootComplete: (complete: boolean) => {
        set({ bootComplete: complete });
      },

      setShowBootScreen: (show: boolean) => {
        set({ showBootScreen: show });
      },

      resetSystemSettings: () => {
        set({
          wallpaper: 'default',
          cursorType: 'default',
          isDockVisible: true,
          dockPosition: 'bottom',
          dockSize: 'medium',
          menuBarVisible: true,
          bootComplete: false,
          showBootScreen: true,
        });
      },
    }),
    {
      name: 'macos:system-settings',
      partialize: (state) => ({
        wallpaper: state.wallpaper,
        cursorType: state.cursorType,
        isDockVisible: state.isDockVisible,
        dockPosition: state.dockPosition,
        dockSize: state.dockSize,
        menuBarVisible: state.menuBarVisible,
        prefersReducedMotion: state.prefersReducedMotion,
      }),
    }
  )
);