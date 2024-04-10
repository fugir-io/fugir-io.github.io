import { persisted } from 'svelte-local-storage-store';
import type { WallpaperID } from '🍎/configs/wallpapers/wallpaper.config';

type WallpaperSettings = {
  id: WallpaperID;
  image: string;
  canControlTheme: boolean;
};

export const wallpaper = persisted<WallpaperSettings>('macos:wallpaper-settings:v2', {
  image: '46',
  id: 'black-bird-in-a-city',
  canControlTheme: true,
});
