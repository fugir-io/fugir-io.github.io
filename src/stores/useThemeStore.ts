import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme } from '🚀/types/app.types';

interface ThemeStore {
  // State
  theme: Theme;
  
  // Actions
  setTheme: (theme: Theme) => void;
  setScheme: (scheme: 'light' | 'dark') => void;
  setPrimaryColor: (primaryColor: string) => void;
  toggleScheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Initial state - detect system preference
      theme: {
        scheme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        primaryColor: 'blue',
      },

      // Actions
      setTheme: (theme: Theme) => {
        set({ theme });
        applyThemeToDOM(theme);
      },

      setScheme: (scheme: 'light' | 'dark') => {
        const { theme } = get();
        const newTheme = { ...theme, scheme };
        set({ theme: newTheme });
        applyThemeToDOM(newTheme);
      },

      setPrimaryColor: (primaryColor: string) => {
        const { theme } = get();
        const newTheme = { ...theme, primaryColor };
        set({ theme: newTheme });
        applyThemeToDOM(newTheme);
      },

      toggleScheme: () => {
        const { theme } = get();
        const newScheme = theme.scheme === 'light' ? 'dark' : 'light';
        const newTheme: Theme = { ...theme, scheme: newScheme };
        set({ theme: newTheme });
        applyThemeToDOM(newTheme);
      },
    }),
    {
      name: 'macos:theme-settings',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          applyThemeToDOM(state.theme);
        }
      },
    }
  )
);

// Helper function to apply theme to DOM (will be implemented with colors config)
function applyThemeToDOM(theme: Theme) {
  const { classList } = document.body;
  classList.remove('light', 'dark');
  classList.add(theme.scheme);

  // This will be expanded when we convert the colors config
  // For now, just basic theme class switching
  console.log('Applied theme:', theme);
}