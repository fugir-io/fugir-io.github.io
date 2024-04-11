import { useAuth0 } from '../services/auth0';

// Really not happy about this, but will need a better way to "addMenuItem" from various
// places where they action button can be populated based on context.
const { logout } = useAuth0;

const appleMenu = {
  title: 'apple',
  menu: {
    'about-this-mac': {
      title: 'About This Mac',
      sound: 'sounds/fanfare.mp3',
      click: () => {
        console.log('I am an alert box for About This Mac!');
      },
      breakAfter: true,
    },
    'system-preferences': {
      title: 'System Preferences...',
      sound: 'sounds/bite.mp3',
      click: () => {
        console.log('I am an alert box for System Preferences...!');
      },
    },
    'app-store': {
      title: 'App Store...',
      sound: 'sounds/switch-on.mp3',
      click: () => {
        console.log('I am an alert box for App Store...!');
      },
      breakAfter: true,
    },
    'recent-items': {
      title: 'Recent Items',
      sound: 'sounds/switch-on.mp3',
      click: () => {
        console.log('I am an alert box for Recent Items!');
      },
      breakAfter: true,
    },
    'force-quit': {
      title: 'Force Quit...',
      sound: 'sounds/switch-on.mp3',
      click: () => {
        console.log('I am an alert box for Force Quit...!');
      },
      breakAfter: true,
    },
    sleep: {
      title: 'Sleep',
      sound: 'sounds/switch-on.mp3',
      click: () => {
        console.log('I am an alert box for Sleep!');
      },
    },
    restart: {
      title: 'Restart...',
      sound: 'sounds/switch-on.mp3',
      click: () => {
        console.log('I am an alert box for Restart...!');
      },
    },
    shutdown: {
      title: 'Shut Down...',
      breakAfter: true,
      sound: 'sounds/switch-on.mp3',
      click: () => {
        console.log('I am an alert box for Shut Down...!');
      },
    },
    'lock-screen': {
      title: 'Lock Screen',
      sound: 'sounds/switch-on.mp3',
      click: () => {
        console.log('I am an alert box for Lock Screen!');
      },
    },
    logout: {
      title: 'Log Out User...',
      sound: 'sounds/switch-off.mp3',
      click: () => {
        logout({
          returnTo: window.location.origin,
        });
      },
    },
  },
};

export const createMenuConfig = <T extends {}>(et: T) => ({ apple: appleMenu, ...et });
