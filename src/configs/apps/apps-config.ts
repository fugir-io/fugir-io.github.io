import { createAppConfig } from '🍎/helpers/create-app-config';

const wallpapers = createAppConfig({
  title: 'Wallpapers',
  resizable: true,

  height: 600,
  width: 800,

  dockBreaksBefore: true,
});

const calculator = createAppConfig({
  title: 'Calculator',

  expandable: true,
  resizable: false,

  height: 300 * 1.414,
  width: 300,
});

const calendar = createAppConfig({
  title: 'Calendar',
  resizable: true,
});

const vscode = createAppConfig({
  title: 'VSCode',
  resizable: true,

  height: 600,
  width: 800,
});

const finder = createAppConfig({
  title: 'Finder',
  resizable: true,

  // dockBreaksBefore: true,
  shouldOpenWindow: false,
});

const safari = createAppConfig({
  title: 'Safari',
  resizable: true,

  width: 800,
  height: 600,
});

const systemPreferences = createAppConfig({
  title: 'System Preferences',
  resizable: true,
});

const developerProfile = createAppConfig({
  title: `About the Developer`,
  resizable: true,

  dockBreaksBefore: true,

  height: 600,
  width: 800,
});

// const viewSource = createAppConfig({
//   title: `View Source`,
//   resizable: true,

//   shouldOpenWindow: false,
//   externalAction: () => window.open('https://github.com/josephbarnett/', '_blank'),
// });

const appstore = createAppConfig({
  title: 'App Store',
  resizable: true,
});

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
