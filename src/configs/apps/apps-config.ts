import { createAppConfig } from '🍎/helpers/create-app-config';

const wallpapers = createAppConfig(
  {
    title: 'Wallpapers',
    resizable: true,

    height: 600,
    width: 800,

    dockBreaksBefore: true,
  },
  'wallpapers',
);

const calculator = createAppConfig(
  {
    title: 'Calculator',
    expandable: true,

    height: 300 * 1.414,
    width: 300,
  },
  'calendar',
);

const calendar = createAppConfig(
  {
    title: 'Calendar',
    expandable: false,
    resizable: true,
  },
  'calendar',
);

const vscode = createAppConfig(
  {
    title: 'VSCode',
    resizable: true,

    height: 600,
    width: 800,
  },
  'vscode',
);

const finder = createAppConfig(
  {
    title: 'Finder',
    resizable: true,

    // dockBreaksBefore: true,
    shouldOpenWindow: false,
  },
  'finder',
);

const safari = createAppConfig(
  {
    title: 'Safari',
    resizable: true,

    width: 800,
    height: 600,
  },
  'safari',
);

const systemPreferences = createAppConfig(
  {
    title: 'System Preferences',
    resizable: true,
  },
  'system-preferences',
);

const developerProfile = createAppConfig(
  {
    title: `About the Developer`,
    resizable: true,

    dockBreaksBefore: true,

    height: 600,
    width: 800,
  },
  'developer',
);

// const viewSource = createAppConfig({
//   title: `View Source`,
//   resizable: true,

//   shouldOpenWindow: false,
//   externalAction: () => window.open('https://github.com/josephbarnett/', '_blank'),
// });

const appstore = createAppConfig(
  {
    title: 'App Store',
    resizable: true,
  },
  'appstore',
);

export const appsConfig = {
  finder,
  wallpapers,
  safari,
  calculator,
  calendar,
  vscode,
  appstore,

  developer: developerProfile,
  // 'view-source': viewSource,
};
