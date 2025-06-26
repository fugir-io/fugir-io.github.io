import React from 'react';
import { AppID } from '@/stores/useAppsStore';

// Import app components (we'll create placeholders for now)
const Calculator = React.lazy(() => import('./Calculator/Calculator'));
const Calendar = React.lazy(() => import('./Calendar/Calendar'));
const VSCode = React.lazy(() => import('./VSCode/VSCode'));
const Safari = React.lazy(() => import('./Safari/Safari'));
const WallpaperApp = React.lazy(() => import('./WallpaperApp/WallpaperApp'));
const AppStore = React.lazy(() => import('./AppStore/AppStore'));
const Terminal = React.lazy(() => import('./Terminal/Terminal'));
const JosephProfile = React.lazy(() => import('./JosephProfile/JosephProfile'));

interface AppNexusProps {
  appID: AppID;
}

const AppNexus: React.FC<AppNexusProps> = ({ appID }) => {
  const renderApp = () => {
    switch (appID) {
      case 'calculator':
        return <Calculator />;
      case 'calendar':
        return <Calendar />;
      case 'vscode':
        return <VSCode />;
      case 'safari':
        return <Safari />;
      case 'wallpapers':
        return <WallpaperApp />;
      case 'appstore':
        return <AppStore />;
      case 'terminal':
        return <Terminal />;
      case 'developer':
        return <JosephProfile />;
      case 'finder':
        return <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Finder</h2>
          <p>File browser coming soon...</p>
        </div>;
      default:
        return (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <h2>App: {appID}</h2>
            <p>This application is not yet implemented.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      overflow: 'hidden',
    }}>
      <React.Suspense fallback={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          fontSize: '14px',
          color: '#666',
        }}>
          Loading {appID}...
        </div>
      }>
        {renderApp()}
      </React.Suspense>
    </div>
  );
};

export default AppNexus;