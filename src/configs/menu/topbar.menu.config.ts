import { AppID } from '🍎/stores/useAppsStore';

export interface MenuAction {
  action: string;
  payload?: any;
}

export interface MenuItem {
  title: string;
  shortcut?: string;
  disabled?: boolean;
  breakAfter?: boolean;
  submenu?: MenuItem[];
  action?: MenuAction;
}

export interface AppMenuConfig {
  [menuName: string]: MenuItem[];
}

export const topbarMenuConfig: Partial<Record<AppID, AppMenuConfig>> & { finder: AppMenuConfig } = {
  // Default/Finder menus
  finder: {
    File: [
      {
        title: 'New Folder',
        shortcut: '⌘N',
        action: { action: 'new-folder' },
        breakAfter: true,
      },
      {
        title: 'New Window',
        shortcut: '⌘T',
        action: { action: 'new-window' },
      },
      {
        title: 'New Tab',
        shortcut: '⌘T',
        action: { action: 'new-tab' },
        breakAfter: true,
      },
      {
        title: 'Open',
        shortcut: '⌘O',
        action: { action: 'open' },
      },
      {
        title: 'Close Window',
        shortcut: '⌘W',
        action: { action: 'close-window' },
        breakAfter: true,
      },
      {
        title: 'Get Info',
        shortcut: '⌘I',
        action: { action: 'get-info' },
      },
      {
        title: 'Move to Trash',
        shortcut: '⌘⌫',
        action: { action: 'move-to-trash' },
      },
    ],
    Edit: [
      {
        title: 'Undo',
        shortcut: '⌘Z',
        action: { action: 'undo' },
      },
      {
        title: 'Redo',
        shortcut: '⌘⇧Z',
        action: { action: 'redo' },
        breakAfter: true,
      },
      {
        title: 'Cut',
        shortcut: '⌘X',
        action: { action: 'cut' },
      },
      {
        title: 'Copy',
        shortcut: '⌘C',
        action: { action: 'copy' },
      },
      {
        title: 'Paste',
        shortcut: '⌘V',
        action: { action: 'paste' },
        breakAfter: true,
      },
      {
        title: 'Select All',
        shortcut: '⌘A',
        action: { action: 'select-all' },
      },
    ],
    View: [
      {
        title: 'as Icons',
        shortcut: '⌘1',
        action: { action: 'view-as-icons' },
      },
      {
        title: 'as List',
        shortcut: '⌘2',
        action: { action: 'view-as-list' },
      },
      {
        title: 'as Columns',
        shortcut: '⌘3',
        action: { action: 'view-as-columns' },
        breakAfter: true,
      },
      {
        title: 'Show Toolbar',
        action: { action: 'toggle-toolbar' },
      },
      {
        title: 'Show Path Bar',
        action: { action: 'toggle-path-bar' },
      },
      {
        title: 'Show Status Bar',
        action: { action: 'toggle-status-bar' },
        breakAfter: true,
      },
      {
        title: 'Show View Options',
        shortcut: '⌘J',
        action: { action: 'show-view-options' },
      },
    ],
    Window: [
      {
        title: 'Minimize',
        shortcut: '⌘M',
        action: { action: 'minimize-window' },
      },
      {
        title: 'Zoom',
        action: { action: 'zoom-window' },
        breakAfter: true,
      },
      {
        title: 'Close',
        shortcut: '⌘W',
        action: { action: 'close-window' },
      },
    ],
    Help: [
      {
        title: 'macOS Help',
        action: { action: 'show-help' },
        breakAfter: true,
      },
      {
        title: 'About Fugir',
        action: { action: 'about-app' },
      },
    ],
  },

  // Safari specific menus
  safari: {
    File: [
      {
        title: 'New Tab',
        shortcut: '⌘T',
        action: { action: 'new-tab' },
      },
      {
        title: 'New Window',
        shortcut: '⌘N',
        action: { action: 'new-window' },
      },
      {
        title: 'New Private Window',
        shortcut: '⌘⇧N',
        action: { action: 'new-private-window' },
        breakAfter: true,
      },
      {
        title: 'Open File...',
        shortcut: '⌘O',
        action: { action: 'open-file' },
      },
      {
        title: 'Open Location...',
        shortcut: '⌘L',
        action: { action: 'open-location' },
        breakAfter: true,
      },
      {
        title: 'Close Tab',
        shortcut: '⌘W',
        action: { action: 'close-tab' },
      },
      {
        title: 'Save Page As...',
        shortcut: '⌘S',
        action: { action: 'save-page' },
      },
    ],
    Edit: [
      {
        title: 'Undo',
        shortcut: '⌘Z',
        action: { action: 'undo' },
      },
      {
        title: 'Redo',
        shortcut: '⌘⇧Z',
        action: { action: 'redo' },
        breakAfter: true,
      },
      {
        title: 'Cut',
        shortcut: '⌘X',
        action: { action: 'cut' },
      },
      {
        title: 'Copy',
        shortcut: '⌘C',
        action: { action: 'copy' },
      },
      {
        title: 'Paste',
        shortcut: '⌘V',
        action: { action: 'paste' },
        breakAfter: true,
      },
      {
        title: 'Find...',
        shortcut: '⌘F',
        action: { action: 'find' },
      },
    ],
    View: [
      {
        title: 'Show Toolbar',
        action: { action: 'toggle-toolbar' },
      },
      {
        title: 'Show Bookmarks Bar',
        shortcut: '⌘⇧B',
        action: { action: 'toggle-bookmarks-bar' },
      },
      {
        title: 'Show Status Bar',
        action: { action: 'toggle-status-bar' },
        breakAfter: true,
      },
      {
        title: 'Reload Page',
        shortcut: '⌘R',
        action: { action: 'reload-page' },
      },
      {
        title: 'Enter Full Screen',
        shortcut: '⌃⌘F',
        action: { action: 'toggle-fullscreen' },
      },
    ],
    Window: [
      {
        title: 'Minimize',
        shortcut: '⌘M',
        action: { action: 'minimize-window' },
      },
      {
        title: 'Zoom',
        action: { action: 'zoom-window' },
        breakAfter: true,
      },
      {
        title: 'Show Previous Tab',
        shortcut: '⌘⇧[',
        action: { action: 'previous-tab' },
      },
      {
        title: 'Show Next Tab',
        shortcut: '⌘⇧]',
        action: { action: 'next-tab' },
      },
    ],
    Help: [
      {
        title: 'Safari Help',
        action: { action: 'show-help' },
        breakAfter: true,
      },
      {
        title: 'About Safari',
        action: { action: 'about-app' },
      },
    ],
  },

  // Calculator specific menus
  calculator: {
    File: [
      {
        title: 'Close',
        shortcut: '⌘W',
        action: { action: 'close-window' },
      },
    ],
    Edit: [
      {
        title: 'Undo',
        shortcut: '⌘Z',
        action: { action: 'undo' },
      },
      {
        title: 'Redo',
        shortcut: '⌘⇧Z',
        action: { action: 'redo' },
        breakAfter: true,
      },
      {
        title: 'Cut',
        shortcut: '⌘X',
        action: { action: 'cut' },
      },
      {
        title: 'Copy',
        shortcut: '⌘C',
        action: { action: 'copy' },
      },
      {
        title: 'Paste',
        shortcut: '⌘V',
        action: { action: 'paste' },
      },
    ],
    View: [
      {
        title: 'Basic',
        action: { action: 'view-basic' },
      },
      {
        title: 'Scientific',
        action: { action: 'view-scientific' },
      },
      {
        title: 'Programmer',
        action: { action: 'view-programmer' },
      },
    ],
    Window: [
      {
        title: 'Minimize',
        shortcut: '⌘M',
        action: { action: 'minimize-window' },
      },
      {
        title: 'Close',
        shortcut: '⌘W',
        action: { action: 'close-window' },
      },
    ],
    Help: [
      {
        title: 'Calculator Help',
        action: { action: 'show-help' },
        breakAfter: true,
      },
      {
        title: 'About Calculator',
        action: { action: 'about-app' },
      },
    ],
  },

  // VS Code specific menus
  vscode: {
    File: [
      {
        title: 'New File',
        shortcut: '⌘N',
        action: { action: 'new-file' },
      },
      {
        title: 'New Window',
        shortcut: '⌘⇧N',
        action: { action: 'new-window' },
      },
      {
        title: 'Open File...',
        shortcut: '⌘O',
        action: { action: 'open-file' },
      },
      {
        title: 'Open Folder...',
        shortcut: '⌘K ⌘O',
        action: { action: 'open-folder' },
        breakAfter: true,
      },
      {
        title: 'Save',
        shortcut: '⌘S',
        action: { action: 'save' },
      },
      {
        title: 'Save As...',
        shortcut: '⌘⇧S',
        action: { action: 'save-as' },
      },
      {
        title: 'Save All',
        shortcut: '⌘⌥S',
        action: { action: 'save-all' },
        breakAfter: true,
      },
      {
        title: 'Close Editor',
        shortcut: '⌘W',
        action: { action: 'close-editor' },
      },
    ],
    Edit: [
      {
        title: 'Undo',
        shortcut: '⌘Z',
        action: { action: 'undo' },
      },
      {
        title: 'Redo',
        shortcut: '⌘⇧Z',
        action: { action: 'redo' },
        breakAfter: true,
      },
      {
        title: 'Cut',
        shortcut: '⌘X',
        action: { action: 'cut' },
      },
      {
        title: 'Copy',
        shortcut: '⌘C',
        action: { action: 'copy' },
      },
      {
        title: 'Paste',
        shortcut: '⌘V',
        action: { action: 'paste' },
        breakAfter: true,
      },
      {
        title: 'Find',
        shortcut: '⌘F',
        action: { action: 'find' },
      },
      {
        title: 'Replace',
        shortcut: '⌘⌥F',
        action: { action: 'replace' },
      },
      {
        title: 'Find in Files',
        shortcut: '⌘⇧F',
        action: { action: 'find-in-files' },
      },
    ],
    View: [
      {
        title: 'Command Palette...',
        shortcut: '⌘⇧P',
        action: { action: 'command-palette' },
        breakAfter: true,
      },
      {
        title: 'Explorer',
        shortcut: '⌘⇧E',
        action: { action: 'toggle-explorer' },
      },
      {
        title: 'Search',
        shortcut: '⌘⇧F',
        action: { action: 'toggle-search' },
      },
      {
        title: 'Source Control',
        shortcut: '⌃⇧G',
        action: { action: 'toggle-source-control' },
      },
      {
        title: 'Extensions',
        shortcut: '⌘⇧X',
        action: { action: 'toggle-extensions' },
        breakAfter: true,
      },
      {
        title: 'Terminal',
        shortcut: '⌃`',
        action: { action: 'toggle-terminal' },
      },
      {
        title: 'Problems',
        shortcut: '⌘⇧M',
        action: { action: 'toggle-problems' },
      },
    ],
    Window: [
      {
        title: 'Minimize',
        shortcut: '⌘M',
        action: { action: 'minimize-window' },
      },
      {
        title: 'Close',
        shortcut: '⌘W',
        action: { action: 'close-window' },
        breakAfter: true,
      },
      {
        title: 'New Editor Group',
        shortcut: '⌘\\',
        action: { action: 'new-editor-group' },
      },
      {
        title: 'Close Editor Group',
        shortcut: '⌘K W',
        action: { action: 'close-editor-group' },
      },
    ],
    Help: [
      {
        title: 'Welcome',
        action: { action: 'show-welcome' },
      },
      {
        title: 'Show All Commands',
        shortcut: '⌘⇧P',
        action: { action: 'command-palette' },
        breakAfter: true,
      },
      {
        title: 'Documentation',
        action: { action: 'show-docs' },
      },
      {
        title: 'About',
        action: { action: 'about-app' },
      },
    ],
  },

  // Terminal specific menus
  terminal: {
    File: [
      {
        title: 'New Window',
        shortcut: '⌘N',
        action: { action: 'new-window' },
      },
      {
        title: 'New Tab',
        shortcut: '⌘T',
        action: { action: 'new-tab' },
        breakAfter: true,
      },
      {
        title: 'Save',
        shortcut: '⌘S',
        action: { action: 'save-output' },
      },
      {
        title: 'Close Window',
        shortcut: '⌘W',
        action: { action: 'close-window' },
      },
    ],
    Edit: [
      {
        title: 'Copy',
        shortcut: '⌘C',
        action: { action: 'copy' },
      },
      {
        title: 'Paste',
        shortcut: '⌘V',
        action: { action: 'paste' },
      },
      {
        title: 'Select All',
        shortcut: '⌘A',
        action: { action: 'select-all' },
        breakAfter: true,
      },
      {
        title: 'Clear',
        shortcut: '⌘K',
        action: { action: 'clear' },
      },
    ],
    View: [
      {
        title: 'Show Colors',
        action: { action: 'toggle-colors' },
      },
      {
        title: 'Show Tab Bar',
        action: { action: 'toggle-tab-bar' },
        breakAfter: true,
      },
      {
        title: 'Bigger Text',
        shortcut: '⌘+',
        action: { action: 'increase-font' },
      },
      {
        title: 'Smaller Text',
        shortcut: '⌘-',
        action: { action: 'decrease-font' },
      },
    ],
    Window: [
      {
        title: 'Minimize',
        shortcut: '⌘M',
        action: { action: 'minimize-window' },
      },
      {
        title: 'Close',
        shortcut: '⌘W',
        action: { action: 'close-window' },
      },
    ],
    Help: [
      {
        title: 'Terminal Help',
        action: { action: 'show-help' },
        breakAfter: true,
      },
      {
        title: 'About Terminal',
        action: { action: 'about-app' },
      },
    ],
  },

  // Calendar specific menus
  calendar: {
    File: [
      {
        title: 'New Event',
        shortcut: '⌘N',
        action: { action: 'new-event' },
      },
      {
        title: 'New Calendar',
        action: { action: 'new-calendar' },
        breakAfter: true,
      },
      {
        title: 'Import...',
        action: { action: 'import' },
      },
      {
        title: 'Export...',
        action: { action: 'export' },
      },
    ],
    Edit: [
      {
        title: 'Undo',
        shortcut: '⌘Z',
        action: { action: 'undo' },
      },
      {
        title: 'Redo',
        shortcut: '⌘⇧Z',
        action: { action: 'redo' },
        breakAfter: true,
      },
      {
        title: 'Delete Event',
        shortcut: '⌫',
        action: { action: 'delete-event' },
      },
    ],
    View: [
      {
        title: 'Show Calendar List',
        action: { action: 'toggle-calendar-list' },
        breakAfter: true,
      },
      {
        title: 'Day',
        shortcut: '⌘1',
        action: { action: 'view-day' },
      },
      {
        title: 'Week',
        shortcut: '⌘2',
        action: { action: 'view-week' },
      },
      {
        title: 'Month',
        shortcut: '⌘3',
        action: { action: 'view-month' },
      },
      {
        title: 'Year',
        shortcut: '⌘4',
        action: { action: 'view-year' },
      },
    ],
    Window: [
      {
        title: 'Minimize',
        shortcut: '⌘M',
        action: { action: 'minimize-window' },
      },
      {
        title: 'Close',
        shortcut: '⌘W',
        action: { action: 'close-window' },
      },
    ],
    Help: [
      {
        title: 'Calendar Help',
        action: { action: 'show-help' },
        breakAfter: true,
      },
      {
        title: 'About Calendar',
        action: { action: 'about-app' },
      },
    ],
  },
};

// Default menu structure for apps that don't have specific configs
export const getMenuConfigForApp = (appId: AppID): AppMenuConfig => {
  return topbarMenuConfig[appId] || topbarMenuConfig.finder;
};