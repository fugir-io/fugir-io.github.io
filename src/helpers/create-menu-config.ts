/**
 * @fileoverview Helper for Creating Menu Configuration
 * This file contains a helper function for creating a menu configuration object.
 * It provides a default Apple menu configuration and allows extending it with additional menus.
 *
 * @requires ../services/auth0
 */

import { useAuth0 } from '../services/auth0';

// Importing the logout function from useAuth0
const { logout } = useAuth0;

/**
 * Default Apple menu configuration containing standard macOS menu items.
 */
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
      /**
       * Action to log out the user when the 'Log Out User...' menu item is clicked.
       * It calls the logout function from the useAuth0 service and redirects the user to the application's origin after logout.
       */
      click: () => {
        logout({
          returnTo: window.location.origin,
        });
      },
    },
  },
};

/**
 * Function to create a menu configuration object by extending the default Apple menu with additional menus.
 * It takes a generic object as input and merges it with the default Apple menu.
 * @param {T} et The additional menu configuration object to merge with the default Apple menu.
 * @returns {Record<string, any>} The complete menu configuration object.
 */
export const createMenuConfig = <T extends {}>(et: T) => ({ apple: appleMenu, ...et });
