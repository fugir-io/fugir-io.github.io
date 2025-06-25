import React, { useEffect, useState } from 'react';
import { useThemeStore } from '🍎/stores/useThemeStore';
import { useSystemStore } from '🍎/stores/useSystemStore';
import { useAppsStore, AppID } from '🍎/stores/useAppsStore';
import { useAppStore } from '🍎/stores/useAppStore';
import { useWallpaperStore } from '🍎/stores/useWallpaperStore';
import { appsConfig } from '🍎/configs/apps/appsConfig';
import Window from './Window/Window';
import Dock from '🍎/components/Dock/Dock';
import TopBar from '🍎/components/TopBar/TopBar';

const Desktop: React.FC = () => {
  console.log('Desktop component rendering');
  
  const theme = useThemeStore((state) => state.theme);
  const { bootComplete, setBootComplete } = useSystemStore((state) => ({
    bootComplete: state.bootComplete,
    setBootComplete: state.setBootComplete,
  }));
  const { openApps } = useAppsStore((state) => ({
    openApps: state.openApps,
  }));
  const { setApp } = useAppStore((state) => ({
    setApp: state.setApp,
  }));
  const { getCurrentWallpaperUrl, currentWallpaper } = useWallpaperStore();

  console.log('Desktop state:', { theme, bootComplete, openApps, wallpaperUrl: getCurrentWallpaperUrl() });

  useEffect(() => {
    // Initialize apps configuration in the store
    Object.entries(appsConfig).forEach(([appId, config]) => {
      setApp(appId, config);
    });

    // Initialize the desktop
    console.log('Desktop initialized with theme:', theme);
    
    // Simulate boot completion
    if (!bootComplete) {
      setTimeout(() => {
        setBootComplete(true);
      }, 1000);
    }
  }, [bootComplete, setBootComplete, theme, setApp]);

  const [wallpaperUrl, setWallpaperUrl] = useState(() => {
    try {
      return getCurrentWallpaperUrl();
    } catch (error) {
      console.error('Error getting wallpaper URL:', error);
      return '/big-sur-1.jpg'; // fallback
    }
  });

  // Update wallpaper when it changes
  useEffect(() => {
    try {
      const newUrl = getCurrentWallpaperUrl();
      console.log('Setting wallpaper URL to:', newUrl);
      setWallpaperUrl(newUrl);
    } catch (error) {
      console.error('Error updating wallpaper URL:', error);
      setWallpaperUrl('/big-sur-1.jpg'); // fallback
    }
  }, [currentWallpaper, getCurrentWallpaperUrl]);

  console.log('About to render Desktop with wallpaperUrl:', wallpaperUrl);

  return (
    <div 
      className="desktop"
      style={{
        width: '100vw',
        height: '100vh',
        background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
        backgroundImage: wallpaperUrl ? `url('${wallpaperUrl}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* TopBar */}
      <TopBar />
      
      {/* Desktop Content Area */}
      <div style={{
        paddingTop: '24px', // Account for top bar
        paddingBottom: '80px', // Account for dock
        height: '100vh',
        width: '100vw',
        position: 'relative',
      }}>
        {/* Render Windows */}
        {(Object.entries(openApps) as Array<[AppID, boolean]>).map(([appId, isOpen]) => 
          isOpen ? <Window key={appId} appID={appId} /> : null
        )}
      </div>

      {/* Dock */}
      <Dock />
    </div>
  );
};

export default Desktop;