import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WallpaperID = 
  | 'ventura'
  | 'ventura-2'
  | 'monterey' 
  | 'monterey-2'
  | 'big-sur'
  | 'big-sur-2'
  | 'big-sur-3'
  | 'catalina'
  | 'mojave'
  | 'desert'
  | 'desert-2'
  | 'dome'
  | 'peak'
  | 'iridescence'
  | 'lake'
  | 'lake-2'
  | 'solar-grad'
  | 'kryptonian-demise'
  | 'nahargarh-sunset'
  | 'somber-forest'
  | 'blade-runner-2149'
  | 'dune'
  | 'tron';

export interface Wallpaper {
  id: WallpaperID;
  name: string;
  type: 'standalone' | 'automatic' | 'dynamic';
  thumbnail: string;
  url: string;
  category?: 'macos' | 'artistic' | 'nature';
}

interface WallpaperStore {
  // State
  currentWallpaper: WallpaperID;
  availableWallpapers: Wallpaper[];
  isDynamic: boolean;
  
  // Actions
  setWallpaper: (wallpaperId: WallpaperID) => void;
  setDynamic: (isDynamic: boolean) => void;
  getCurrentWallpaperUrl: () => string;
  getWallpaperByTime: (wallpaperId: WallpaperID) => string;
}

// Create wallpaper list with actual files available in public folder
const createWallpaperList = (): Wallpaper[] => {
  return [
    // macOS Wallpapers
    { id: 'big-sur', name: 'Big Sur', type: 'dynamic', thumbnail: 'big-sur-4.jpg', url: 'big-sur-1.jpg', category: 'macos' },
    { id: 'big-sur-2', name: 'Big Sur Light', type: 'standalone', thumbnail: 'big-sur-2.jpg', url: 'big-sur-2.jpg', category: 'macos' },
    { id: 'big-sur-3', name: 'Big Sur Evening', type: 'standalone', thumbnail: 'big-sur-3.jpg', url: 'big-sur-3.jpg', category: 'macos' },
    { id: 'monterey', name: 'Monterey', type: 'dynamic', thumbnail: 'monterey-2.jpg', url: 'monterey-1.jpg', category: 'macos' },
    { id: 'monterey-2', name: 'Monterey Light', type: 'standalone', thumbnail: 'monterey-3.jpg', url: 'monterey-3.jpg', category: 'macos' },
    { id: 'ventura', name: 'Ventura', type: 'dynamic', thumbnail: 'ventura-2.webp', url: 'ventura-1.webp', category: 'macos' },
    { id: 'ventura-2', name: 'Ventura Light', type: 'standalone', thumbnail: 'ventura-3.webp', url: 'ventura-3.webp', category: 'macos' },
    { id: 'catalina', name: 'Catalina', type: 'dynamic', thumbnail: 'catalina-3.jpg', url: 'catalina-1.jpg', category: 'macos' },
    { id: 'mojave', name: 'Mojave', type: 'dynamic', thumbnail: 'mojave-2.jpg', url: 'mojave-1.jpg', category: 'macos' },
    
    // Nature Wallpapers
    { id: 'desert', name: 'Desert', type: 'dynamic', thumbnail: 'desert-5.jpg', url: 'desert-1.jpg', category: 'nature' },
    { id: 'desert-2', name: 'Desert Dawn', type: 'standalone', thumbnail: 'desert-2.jpg', url: 'desert-2.jpg', category: 'nature' },
    { id: 'lake', name: 'Lake', type: 'dynamic', thumbnail: 'lake-4.jpg', url: 'lake-1.jpg', category: 'nature' },
    { id: 'lake-2', name: 'Lake Sunset', type: 'standalone', thumbnail: 'lake-2.jpg', url: 'lake-2.jpg', category: 'nature' },
    { id: 'peak', name: 'Peak', type: 'dynamic', thumbnail: 'peak-2.jpg', url: 'peak-1.jpg', category: 'nature' },
    { id: 'dome', name: 'Dome', type: 'dynamic', thumbnail: 'dome-2.jpg', url: 'dome-1.jpg', category: 'nature' },
    
    // Artistic Wallpapers
    { id: 'solar-grad', name: 'Solar Gradients', type: 'dynamic', thumbnail: 'solar-grad-11.jpg', url: 'solar-grad-1.jpg', category: 'artistic' },
    { id: 'iridescence', name: 'Iridescence', type: 'dynamic', thumbnail: 'iridescence-2.jpg', url: 'iridescence-1.jpg', category: 'artistic' },
    { id: 'kryptonian-demise', name: 'Kryptonian Demise', type: 'standalone', thumbnail: '38.jpg', url: '38.jpg', category: 'artistic' },
    { id: 'nahargarh-sunset', name: 'Nahargarh Sunset', type: 'standalone', thumbnail: '39.jpg', url: '39.jpg', category: 'artistic' },
    { id: 'somber-forest', name: 'Somber Forest', type: 'standalone', thumbnail: '40.jpg', url: '40.jpg', category: 'artistic' },
    { id: 'blade-runner-2149', name: 'Blade Runner 2149', type: 'standalone', thumbnail: '41.jpg', url: '41.jpg', category: 'artistic' },
    { id: 'dune', name: 'Dune', type: 'standalone', thumbnail: '51.jpg', url: '51.jpg', category: 'artistic' },
    { id: 'tron', name: 'Tron', type: 'standalone', thumbnail: '57.jpg', url: '57.jpg', category: 'artistic' },
  ];
};

const useWallpaperStore = create<WallpaperStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentWallpaper: 'big-sur',
      availableWallpapers: createWallpaperList(),
      isDynamic: true,
      
      // Actions
      setWallpaper: (wallpaperId: WallpaperID) => {
        console.log(`Setting wallpaper to: ${wallpaperId}`);
        set({ currentWallpaper: wallpaperId });
      },
      
      setDynamic: (isDynamic: boolean) => {
        set({ isDynamic });
      },
      
      getCurrentWallpaperUrl: () => {
        const { currentWallpaper, availableWallpapers } = get();
        const wallpaper = availableWallpapers.find(w => w.id === currentWallpaper);
        return wallpaper ? `/${wallpaper.url}` : '/big-sur-1.jpg';
      },
      
      getWallpaperByTime: (wallpaperId: WallpaperID) => {
        const { availableWallpapers, isDynamic } = get();
        const wallpaper = availableWallpapers.find(w => w.id === wallpaperId);
        
        if (!wallpaper || !isDynamic || wallpaper.type === 'standalone') {
          return wallpaper ? `/${wallpaper.url}` : '/big-sur-1.jpg';
        }
        
        // For dynamic wallpapers, we could implement time-based switching
        // For now, just return the base wallpaper
        const hour = new Date().getHours();
        
        // Simple day/night logic for dynamic wallpapers
        if (hour >= 7 && hour < 18) {
          // Day time - use lighter version
          const dayVariant = wallpaper.url.replace('-1.', '-2.');
          return `/${dayVariant}`;
        } else {
          // Night time - use darker version
          return `/${wallpaper.url}`;
        }
      },
    }),
    {
      name: 'macos:wallpaper-state',
      partialize: (state) => ({
        currentWallpaper: state.currentWallpaper,
        isDynamic: state.isDynamic,
      }),
    }
  )
);

export { useWallpaperStore };