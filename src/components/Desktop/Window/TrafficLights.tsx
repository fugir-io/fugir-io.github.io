import React, { useState } from 'react';
import { useAppsStore, AppID } from '🚀/stores/useAppsStore';
import { useAppStore } from '🚀/stores/useAppStore';

interface TrafficLightsProps {
  appID: AppID;
}

const TrafficLights: React.FC<TrafficLightsProps> = ({ appID }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const {
    closeApp,
    setAppFullscreen,
    appsInFullscreen,
    activeApp,
  } = useAppsStore((state) => ({
    closeApp: state.closeApp,
    setAppFullscreen: state.setAppFullscreen,
    appsInFullscreen: state.appsInFullscreen,
    activeApp: state.activeApp,
  }));

  const appConfig = useAppStore((state) => state.getApp(appID));
  const updateApp = useAppStore((state) => state.updateApp);

  const isActive = activeApp === appID;
  const isFullscreen = appsInFullscreen[appID];

  const handleClose = () => {
    closeApp(appID);
  };

  const handleMinimize = () => {
    // Minimize functionality - could animate to dock
    console.log('Minimize app:', appID);
    closeApp(appID); // For now, just close
  };

  const handleMaximize = () => {
    if (appConfig?.expandable) {
      setAppFullscreen(appID, !isFullscreen);
      updateApp(appID, { isMaximized: !isFullscreen });
    }
  };

  const buttonStyle = (color: string, isHovered: boolean): React.CSSProperties => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: isActive ? color : '#d0d0d0',
    border: `1px solid ${isActive ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.2)'}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    color: isHovered ? 'rgba(0,0,0,0.8)' : 'transparent',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
    }}>
      {/* Close Button */}
      <button
        style={buttonStyle('#ff5f57', hovered === 'close')}
        onClick={handleClose}
        onMouseEnter={() => setHovered('close')}
        onMouseLeave={() => setHovered(null)}
        title="Close"
      >
        {hovered === 'close' && '×'}
      </button>

      {/* Minimize Button */}
      <button
        style={buttonStyle('#ffbd2e', hovered === 'minimize')}
        onClick={handleMinimize}
        onMouseEnter={() => setHovered('minimize')}
        onMouseLeave={() => setHovered(null)}
        title="Minimize"
      >
        {hovered === 'minimize' && '−'}
      </button>

      {/* Maximize Button */}
      <button
        style={{
          ...buttonStyle('#28ca42', hovered === 'maximize'),
          opacity: appConfig?.expandable ? 1 : 0.5,
          cursor: appConfig?.expandable ? 'pointer' : 'default',
        }}
        onClick={appConfig?.expandable ? handleMaximize : undefined}
        onMouseEnter={() => appConfig?.expandable && setHovered('maximize')}
        onMouseLeave={() => setHovered(null)}
        title={appConfig?.expandable ? (isFullscreen ? 'Restore' : 'Maximize') : 'Not expandable'}
        disabled={!appConfig?.expandable}
      >
        {hovered === 'maximize' && appConfig?.expandable && (isFullscreen ? '⎘' : '⬜')}
      </button>
    </div>
  );
};

export default TrafficLights;