import { createAppConfig } from '🚀/helpers/createAppConfig';
// import { AppID } from '🚀/stores/useAppsStore'; // Removed unused import

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
  'calculator',
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

const appstore = createAppConfig(
  {
    title: 'App Store',
    resizable: true,
  },
  'appstore',
);

const terminal = createAppConfig(
  {
    title: 'Terminal',
    resizable: true,
    height: 500,
    width: 800,
  },
  'terminal',
);

export const appsConfig = {
  finder,
  wallpapers,
  safari,
  calculator,
  calendar,
  vscode,
  appstore,
  terminal,
  developer: developerProfile,
} as const;

export type AppsConfigType = typeof appsConfig;
export type AppConfigKey = keyof AppsConfigType;